/**
 * A from-scratch implementation of the QR Code (ISO/IEC 18004) encoding algorithm.
 *
 * No Angular imports live here on purpose - this module is pure TypeScript so the
 * encoding logic (bit-stream construction, Reed-Solomon error correction, module
 * placement, and mask selection) can be read, tested, and reasoned about in isolation
 * from the component that renders it to a <canvas>.
 *
 * Scope: Byte mode only (arbitrary UTF-8 text/URLs), versions 1-40, all four standard
 * error correction levels (L/M/Q/H). The smallest version that fits the given data at
 * the requested error correction level is chosen automatically.
 */

export type NxQrErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface NxQrEncodeOptions {
  /** Error correction level - higher levels tolerate more damage but hold less data. Default 'M'. */
  errorCorrectionLevel?: NxQrErrorCorrectionLevel;
  /** Force a minimum QR version (1-40) even if the data would fit in a smaller one. */
  minVersion?: number;
}

export interface NxQrCodeMatrix {
  /** Width/height of the symbol in modules (not counting any quiet zone). */
  size: number;
  /** modules[row][col] - true means a dark (foreground) module. */
  modules: boolean[][];
  /** The QR version (1-40) that was selected to fit the data. */
  version: number;
  errorCorrectionLevel: NxQrErrorCorrectionLevel;
  /** The mask pattern (0-7) chosen by penalty-score evaluation. */
  maskPattern: number;
}

// =====================================================================================
// Reed-Solomon error correction over GF(256)
// =====================================================================================

const GF_EXP = new Array<number>(512);
const GF_LOG = new Array<number>(256);

(function initGaloisField(): void {
  // Primitive polynomial x^8 + x^4 + x^3 + x^2 + 1 (0x11D), as specified by ISO/IEC 18004.
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) {
      x ^= 0x11d;
    }
  }
  for (let i = 255; i < 512; i++) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) {
    return 0;
  }
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

/** Builds the Reed-Solomon generator polynomial of the given degree, coefficients high-to-low. */
function buildGeneratorPolynomial(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const nextPoly = new Array<number>(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      nextPoly[j] ^= poly[j];
      nextPoly[j + 1] ^= gfMul(poly[j], GF_EXP[i]);
    }
    poly = nextPoly;
  }
  return poly;
}

const generatorCache = new Map<number, number[]>();
function getGenerator(degree: number): number[] {
  let gen = generatorCache.get(degree);
  if (!gen) {
    gen = buildGeneratorPolynomial(degree);
    generatorCache.set(degree, gen);
  }
  return gen;
}

/** Computes the `eccLength` Reed-Solomon error correction codewords for one data block. */
function computeReedSolomonCodewords(data: number[], eccLength: number): number[] {
  const generator = getGenerator(eccLength);
  const remainder = new Array<number>(data.length + eccLength).fill(0);
  for (let i = 0; i < data.length; i++) {
    remainder[i] = data[i];
  }
  for (let i = 0; i < data.length; i++) {
    const factor = remainder[i];
    if (factor === 0) {
      continue;
    }
    for (let j = 0; j < generator.length; j++) {
      remainder[i + j] ^= gfMul(generator[j], factor);
    }
  }
  return remainder.slice(data.length);
}

// =====================================================================================
// Error-correction block structure table (ISO/IEC 18004 Table 9)
// =====================================================================================
// Each version/level maps to one or two groups of identically-sized blocks, given as
// [blockCount, totalCodewordsPerBlock, dataCodewordsPerBlock]. The EC codeword count per
// block is implicit (total - data) and is constant across all blocks of a version/level.

type RsGroup = [count: number, total: number, data: number];
interface RsBlockInfo {
  L: RsGroup[];
  M: RsGroup[];
  Q: RsGroup[];
  H: RsGroup[];
}

const RS_BLOCK_TABLE: RsBlockInfo[] = [
  /* 1  */ { L: [[1, 26, 19]], M: [[1, 26, 16]], Q: [[1, 26, 13]], H: [[1, 26, 9]] },
  /* 2  */ { L: [[1, 44, 34]], M: [[1, 44, 28]], Q: [[1, 44, 22]], H: [[1, 44, 16]] },
  /* 3  */ { L: [[1, 70, 55]], M: [[1, 70, 44]], Q: [[2, 35, 17]], H: [[2, 35, 13]] },
  /* 4  */ { L: [[1, 100, 80]], M: [[2, 50, 32]], Q: [[2, 50, 24]], H: [[4, 25, 9]] },
  /* 5  */ { L: [[1, 134, 108]], M: [[2, 67, 43]], Q: [[2, 33, 15], [2, 34, 16]], H: [[2, 33, 11], [2, 34, 12]] },
  /* 6  */ { L: [[2, 86, 68]], M: [[4, 43, 27]], Q: [[4, 43, 19]], H: [[4, 43, 15]] },
  /* 7  */ { L: [[2, 98, 78]], M: [[4, 49, 31]], Q: [[2, 32, 14], [4, 33, 15]], H: [[4, 39, 13], [1, 40, 14]] },
  /* 8  */ { L: [[2, 121, 97]], M: [[2, 60, 38], [2, 61, 39]], Q: [[4, 40, 18], [2, 41, 19]], H: [[4, 40, 14], [2, 41, 15]] },
  /* 9  */ { L: [[2, 146, 116]], M: [[3, 58, 36], [2, 59, 37]], Q: [[4, 36, 16], [4, 37, 17]], H: [[4, 36, 12], [4, 37, 13]] },
  /* 10 */ { L: [[2, 86, 68], [2, 87, 69]], M: [[4, 69, 43], [1, 70, 44]], Q: [[6, 43, 19], [2, 44, 20]], H: [[6, 43, 15], [2, 44, 16]] },
  /* 11 */ { L: [[4, 101, 81]], M: [[1, 80, 50], [4, 81, 51]], Q: [[4, 50, 22], [4, 51, 23]], H: [[3, 36, 12], [8, 37, 13]] },
  /* 12 */ { L: [[2, 116, 92], [2, 117, 93]], M: [[6, 58, 36], [2, 59, 37]], Q: [[4, 46, 20], [6, 47, 21]], H: [[7, 42, 14], [4, 43, 15]] },
  /* 13 */ { L: [[4, 133, 107]], M: [[8, 59, 37], [1, 60, 38]], Q: [[8, 44, 20], [4, 45, 21]], H: [[12, 33, 11], [4, 34, 12]] },
  /* 14 */ { L: [[3, 145, 115], [1, 146, 116]], M: [[4, 64, 40], [5, 65, 41]], Q: [[11, 36, 16], [5, 37, 17]], H: [[11, 36, 12], [5, 37, 13]] },
  /* 15 */ { L: [[5, 109, 87], [1, 110, 88]], M: [[5, 65, 41], [5, 66, 42]], Q: [[5, 54, 24], [7, 55, 25]], H: [[11, 36, 12], [7, 37, 13]] },
  /* 16 */ { L: [[5, 122, 98], [1, 123, 99]], M: [[7, 73, 45], [3, 74, 46]], Q: [[15, 43, 19], [2, 44, 20]], H: [[3, 45, 15], [13, 46, 16]] },
  /* 17 */ { L: [[1, 135, 107], [5, 136, 108]], M: [[10, 74, 46], [1, 75, 47]], Q: [[1, 50, 22], [15, 51, 23]], H: [[2, 42, 14], [17, 43, 15]] },
  /* 18 */ { L: [[5, 150, 120], [1, 151, 121]], M: [[9, 69, 43], [4, 70, 44]], Q: [[17, 50, 22], [1, 51, 23]], H: [[2, 42, 14], [19, 43, 15]] },
  /* 19 */ { L: [[3, 141, 113], [4, 142, 114]], M: [[3, 70, 44], [11, 71, 45]], Q: [[17, 47, 21], [4, 48, 22]], H: [[9, 39, 13], [16, 40, 14]] },
  /* 20 */ { L: [[3, 135, 107], [5, 136, 108]], M: [[3, 67, 41], [13, 68, 42]], Q: [[15, 54, 24], [5, 55, 25]], H: [[15, 43, 15], [10, 44, 16]] },
  /* 21 */ { L: [[4, 144, 116], [4, 145, 117]], M: [[17, 68, 42]], Q: [[17, 50, 22], [6, 51, 23]], H: [[19, 46, 16], [6, 47, 17]] },
  /* 22 */ { L: [[2, 139, 111], [7, 140, 112]], M: [[17, 74, 46]], Q: [[7, 54, 24], [16, 55, 25]], H: [[34, 37, 13]] },
  /* 23 */ { L: [[4, 151, 121], [5, 152, 122]], M: [[4, 75, 47], [14, 76, 48]], Q: [[11, 54, 24], [14, 55, 25]], H: [[16, 45, 15], [14, 46, 16]] },
  /* 24 */ { L: [[6, 147, 117], [4, 148, 118]], M: [[6, 73, 45], [14, 74, 46]], Q: [[11, 54, 24], [16, 55, 25]], H: [[30, 46, 16], [2, 47, 17]] },
  /* 25 */ { L: [[8, 132, 106], [4, 133, 107]], M: [[8, 75, 47], [13, 76, 48]], Q: [[7, 54, 24], [22, 55, 25]], H: [[22, 45, 15], [13, 46, 16]] },
  /* 26 */ { L: [[10, 142, 114], [2, 143, 115]], M: [[19, 74, 46], [4, 75, 47]], Q: [[28, 50, 22], [6, 51, 23]], H: [[33, 46, 16], [4, 47, 17]] },
  /* 27 */ { L: [[8, 152, 122], [4, 153, 123]], M: [[22, 73, 45], [3, 74, 46]], Q: [[8, 53, 23], [26, 54, 24]], H: [[12, 45, 15], [28, 46, 16]] },
  /* 28 */ { L: [[3, 147, 117], [10, 148, 118]], M: [[3, 73, 45], [23, 74, 46]], Q: [[4, 54, 24], [31, 55, 25]], H: [[11, 45, 15], [31, 46, 16]] },
  /* 29 */ { L: [[7, 146, 116], [7, 147, 117]], M: [[21, 73, 45], [7, 74, 46]], Q: [[1, 53, 23], [37, 54, 24]], H: [[19, 45, 15], [26, 46, 16]] },
  /* 30 */ { L: [[5, 145, 115], [10, 146, 116]], M: [[19, 75, 47], [10, 76, 48]], Q: [[15, 54, 24], [25, 55, 25]], H: [[23, 45, 15], [25, 46, 16]] },
  /* 31 */ { L: [[13, 145, 115], [3, 146, 116]], M: [[2, 74, 46], [29, 75, 47]], Q: [[42, 54, 24], [1, 55, 25]], H: [[23, 45, 15], [28, 46, 16]] },
  /* 32 */ { L: [[17, 145, 115]], M: [[10, 74, 46], [23, 75, 47]], Q: [[10, 54, 24], [35, 55, 25]], H: [[19, 45, 15], [35, 46, 16]] },
  /* 33 */ { L: [[17, 145, 115], [1, 146, 116]], M: [[14, 74, 46], [21, 75, 47]], Q: [[29, 54, 24], [19, 55, 25]], H: [[11, 45, 15], [46, 46, 16]] },
  /* 34 */ { L: [[13, 145, 115], [6, 146, 116]], M: [[14, 74, 46], [23, 75, 47]], Q: [[44, 54, 24], [7, 55, 25]], H: [[59, 46, 16], [1, 47, 17]] },
  /* 35 */ { L: [[12, 151, 121], [7, 152, 122]], M: [[12, 75, 47], [26, 76, 48]], Q: [[39, 54, 24], [14, 55, 25]], H: [[22, 45, 15], [41, 46, 16]] },
  /* 36 */ { L: [[6, 151, 121], [14, 152, 122]], M: [[6, 75, 47], [34, 76, 48]], Q: [[46, 54, 24], [10, 55, 25]], H: [[2, 45, 15], [64, 46, 16]] },
  /* 37 */ { L: [[17, 152, 122], [4, 153, 123]], M: [[29, 74, 46], [14, 75, 47]], Q: [[49, 54, 24], [10, 55, 25]], H: [[24, 45, 15], [46, 46, 16]] },
  /* 38 */ { L: [[4, 152, 122], [18, 153, 123]], M: [[13, 74, 46], [32, 75, 47]], Q: [[48, 54, 24], [14, 55, 25]], H: [[42, 45, 15], [32, 46, 16]] },
  /* 39 */ { L: [[20, 147, 117], [4, 148, 118]], M: [[40, 75, 47], [7, 76, 48]], Q: [[43, 54, 24], [22, 55, 25]], H: [[10, 45, 15], [67, 46, 16]] },
  /* 40 */ { L: [[19, 148, 118], [6, 149, 119]], M: [[18, 75, 47], [31, 76, 48]], Q: [[34, 54, 24], [34, 55, 25]], H: [[20, 45, 15], [61, 46, 16]] },
];

// Alignment pattern center coordinates per version (ISO/IEC 18004 Annex E / Table E.1).
const ALIGNMENT_PATTERN_POSITIONS: number[][] = [
  /* 1  */ [],
  /* 2  */ [6, 18],
  /* 3  */ [6, 22],
  /* 4  */ [6, 26],
  /* 5  */ [6, 30],
  /* 6  */ [6, 34],
  /* 7  */ [6, 22, 38],
  /* 8  */ [6, 24, 42],
  /* 9  */ [6, 26, 46],
  /* 10 */ [6, 28, 50],
  /* 11 */ [6, 30, 54],
  /* 12 */ [6, 32, 58],
  /* 13 */ [6, 34, 62],
  /* 14 */ [6, 26, 46, 66],
  /* 15 */ [6, 26, 48, 70],
  /* 16 */ [6, 26, 50, 74],
  /* 17 */ [6, 30, 54, 78],
  /* 18 */ [6, 30, 56, 82],
  /* 19 */ [6, 30, 58, 86],
  /* 20 */ [6, 34, 62, 90],
  /* 21 */ [6, 28, 50, 72, 94],
  /* 22 */ [6, 26, 50, 74, 98],
  /* 23 */ [6, 30, 54, 78, 102],
  /* 24 */ [6, 28, 54, 80, 106],
  /* 25 */ [6, 32, 58, 84, 110],
  /* 26 */ [6, 30, 58, 86, 114],
  /* 27 */ [6, 34, 62, 90, 118],
  /* 28 */ [6, 26, 50, 74, 98, 122],
  /* 29 */ [6, 30, 54, 78, 102, 126],
  /* 30 */ [6, 26, 52, 78, 104, 130],
  /* 31 */ [6, 30, 56, 82, 108, 134],
  /* 32 */ [6, 34, 60, 86, 112, 138],
  /* 33 */ [6, 30, 58, 86, 114, 142],
  /* 34 */ [6, 34, 62, 90, 118, 146],
  /* 35 */ [6, 30, 54, 78, 102, 126, 150],
  /* 36 */ [6, 24, 50, 76, 102, 128, 154],
  /* 37 */ [6, 28, 54, 80, 106, 132, 158],
  /* 38 */ [6, 32, 58, 84, 110, 136, 162],
  /* 39 */ [6, 26, 54, 82, 110, 138, 166],
  /* 40 */ [6, 30, 58, 86, 114, 142, 170],
];

function getDataCapacityCodewords(version: number, level: NxQrErrorCorrectionLevel): number {
  const groups = RS_BLOCK_TABLE[version - 1][level];
  return groups.reduce((sum, [count, , data]) => sum + count * data, 0);
}

// =====================================================================================
// Bit-stream construction (Byte mode)
// =====================================================================================

const MODE_BYTE = 0b0100;

function pushBits(bits: number[], value: number, length: number): void {
  for (let i = length - 1; i >= 0; i--) {
    bits.push((value >> i) & 1);
  }
}

function charCountBits(version: number): number {
  return version <= 9 ? 8 : 16;
}

function chooseVersion(
  dataLength: number,
  level: NxQrErrorCorrectionLevel,
  minVersion: number,
): number {
  for (let version = Math.max(1, minVersion); version <= 40; version++) {
    const capacityBits = getDataCapacityCodewords(version, level) * 8;
    const requiredBits = 4 + charCountBits(version) + dataLength * 8;
    if (requiredBits <= capacityBits) {
      return version;
    }
  }
  throw new Error(
    'NxQrCode: the given value is too long to fit in a QR code at the requested error correction level.',
  );
}

function buildBitStream(dataBytes: number[], version: number, level: NxQrErrorCorrectionLevel): number[] {
  const bits: number[] = [];
  pushBits(bits, MODE_BYTE, 4);
  pushBits(bits, dataBytes.length, charCountBits(version));
  for (const byte of dataBytes) {
    pushBits(bits, byte, 8);
  }

  const capacityBits = getDataCapacityCodewords(version, level) * 8;

  // Terminator: up to 4 zero bits, but never past capacity.
  const terminatorLength = Math.min(4, Math.max(0, capacityBits - bits.length));
  for (let i = 0; i < terminatorLength; i++) {
    bits.push(0);
  }

  // Pad to a byte boundary.
  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  // Pad codewords, alternating 0xEC / 0x11, until the symbol's capacity is filled.
  const padBytes = [0xec, 0x11];
  let padIndex = 0;
  while (bits.length < capacityBits) {
    pushBits(bits, padBytes[padIndex % 2], 8);
    padIndex++;
  }

  return bits;
}

function bitsToCodewords(bits: number[]): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | (bits[i + j] ?? 0);
    }
    bytes.push(byte);
  }
  return bytes;
}

function codewordsToBits(codewords: number[]): number[] {
  const bits: number[] = [];
  for (const byte of codewords) {
    for (let i = 7; i >= 0; i--) {
      bits.push((byte >> i) & 1);
    }
  }
  return bits;
}

interface RsBlock {
  data: number[];
  ecc: number[];
}

function splitIntoBlocksAndEncode(
  dataCodewords: number[],
  version: number,
  level: NxQrErrorCorrectionLevel,
): RsBlock[] {
  const groups = RS_BLOCK_TABLE[version - 1][level];
  const blocks: RsBlock[] = [];
  let offset = 0;
  for (const [count, total, dataLen] of groups) {
    const eccLen = total - dataLen;
    for (let i = 0; i < count; i++) {
      const data = dataCodewords.slice(offset, offset + dataLen);
      offset += dataLen;
      const ecc = computeReedSolomonCodewords(data, eccLen);
      blocks.push({ data, ecc });
    }
  }
  return blocks;
}

function interleaveBlocks(blocks: RsBlock[]): number[] {
  const result: number[] = [];
  const maxData = Math.max(...blocks.map((b) => b.data.length));
  for (let i = 0; i < maxData; i++) {
    for (const block of blocks) {
      if (i < block.data.length) {
        result.push(block.data[i]);
      }
    }
  }
  const maxEcc = Math.max(...blocks.map((b) => b.ecc.length));
  for (let i = 0; i < maxEcc; i++) {
    for (const block of blocks) {
      if (i < block.ecc.length) {
        result.push(block.ecc[i]);
      }
    }
  }
  return result;
}

// =====================================================================================
// Matrix construction: function patterns, data placement, masking, format/version info
// =====================================================================================

function createMatrix(size: number, fill: boolean): boolean[][] {
  return Array.from({ length: size }, () => new Array<boolean>(size).fill(fill));
}

function cloneMatrix(matrix: boolean[][]): boolean[][] {
  return matrix.map((row) => row.slice());
}

interface FunctionPatterns {
  matrix: boolean[][];
  functionMask: boolean[][];
}

function buildFunctionPatterns(size: number, version: number): FunctionPatterns {
  const matrix = createMatrix(size, false);
  const functionMask = createMatrix(size, false);

  const setModule = (r: number, c: number, dark: boolean): void => {
    matrix[r][c] = dark;
    functionMask[r][c] = true;
  };
  const reserve = (r: number, c: number): void => {
    functionMask[r][c] = true;
  };

  const placeFinder = (topRow: number, topCol: number): void => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = topRow + r;
        const cc = topCol + c;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) {
          continue;
        }
        let dark = false;
        if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
          dark = r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
        }
        setModule(rr, cc, dark);
      }
    }
  };

  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  // Timing patterns (between the finder patterns, alternating starting dark).
  for (let i = 8; i < size - 8; i++) {
    const dark = i % 2 === 0;
    setModule(6, i, dark);
    setModule(i, 6, dark);
  }

  // Alignment patterns.
  const positions = ALIGNMENT_PATTERN_POSITIONS[version - 1];
  for (const row of positions) {
    for (const col of positions) {
      const overlapsFinder =
        (row === 6 && col === 6) || (row === 6 && col === size - 7) || (row === size - 7 && col === 6);
      if (overlapsFinder) {
        continue;
      }
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          const dark = Math.max(Math.abs(r), Math.abs(c)) !== 1;
          setModule(row + r, col + c, dark);
        }
      }
    }
  }

  // The single fixed dark module.
  setModule(size - 8, 8, true);

  // Reserve format info areas (values filled in later, once the mask is chosen).
  for (let i = 0; i <= 8; i++) {
    reserve(8, i);
    reserve(i, 8);
  }
  for (let i = 0; i < 7; i++) {
    reserve(size - 1 - i, 8);
  }
  for (let i = 0; i < 8; i++) {
    reserve(8, size - 1 - i);
  }

  // Reserve version info areas (version >= 7 only).
  if (version >= 7) {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 3; c++) {
        reserve(r, size - 11 + c);
        reserve(size - 11 + c, r);
      }
    }
  }

  return { matrix, functionMask };
}

function placeDataBits(matrix: boolean[][], functionMask: boolean[][], size: number, bits: number[]): void {
  let bitIndex = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) {
      right--;
    }
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        const upward = ((right + 1) & 2) === 0;
        const y = upward ? size - 1 - vert : vert;
        if (!functionMask[y][x]) {
          const bit = bitIndex < bits.length ? bits[bitIndex] : 0;
          matrix[y][x] = bit === 1;
          bitIndex++;
        }
      }
    }
  }
}

type MaskFn = (r: number, c: number) => boolean;

function getMaskFn(mask: number): MaskFn {
  switch (mask) {
    case 0:
      return (r, c) => (r + c) % 2 === 0;
    case 1:
      return (r) => r % 2 === 0;
    case 2:
      return (_r, c) => c % 3 === 0;
    case 3:
      return (r, c) => (r + c) % 3 === 0;
    case 4:
      return (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
    case 5:
      return (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0;
    case 6:
      return (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0;
    case 7:
      return (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0;
    default:
      throw new Error(`NxQrCode: invalid mask pattern ${mask}`);
  }
}

function applyMask(matrix: boolean[][], functionMask: boolean[][], size: number, mask: number): void {
  const fn = getMaskFn(mask);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!functionMask[r][c] && fn(r, c)) {
        matrix[r][c] = !matrix[r][c];
      }
    }
  }
}

const EC_LEVEL_BITS: Record<NxQrErrorCorrectionLevel, number> = { L: 0b01, M: 0b00, Q: 0b11, H: 0b10 };

function computeFormatBits(ecLevel: NxQrErrorCorrectionLevel, mask: number): number {
  const data5 = (EC_LEVEL_BITS[ecLevel] << 3) | mask;
  let d = data5 << 10;
  const generator = 0b10100110111; // degree-10 generator polynomial (0x537)
  for (let i = 14; i >= 10; i--) {
    if ((d >> i) & 1) {
      d ^= generator << (i - 10);
    }
  }
  const codeword = (data5 << 10) | d;
  return codeword ^ 0b101010000010010; // fixed XOR mask (0x5412)
}

function writeFormatInfo(matrix: boolean[][], size: number, ecLevel: NxQrErrorCorrectionLevel, mask: number): void {
  const bits = computeFormatBits(ecLevel, mask);
  const copyA: Array<[number, number]> = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  ];
  const copyB: Array<[number, number]> = [
    [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8], [size - 6, 8], [size - 7, 8],
    [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1],
  ];
  for (let i = 0; i < 15; i++) {
    const bit = (bits >> i) & 1;
    const [r1, c1] = copyA[i];
    const [r2, c2] = copyB[i];
    matrix[r1][c1] = bit === 1;
    matrix[r2][c2] = bit === 1;
  }
  matrix[size - 8][8] = true;
}

function computeVersionBits(version: number): number {
  let d = version << 12;
  const generator = 0b1111100100101; // degree-12 generator polynomial (0x1F25)
  for (let i = 17; i >= 12; i--) {
    if ((d >> i) & 1) {
      d ^= generator << (i - 12);
    }
  }
  return (version << 12) | d;
}

function writeVersionInfo(matrix: boolean[][], size: number, version: number): void {
  const bits = computeVersionBits(version);
  for (let i = 0; i < 18; i++) {
    const bit = (bits >> i) & 1;
    const a = Math.floor(i / 3);
    const b = i % 3;
    matrix[a][size - 11 + b] = bit === 1;
    matrix[size - 11 + b][a] = bit === 1;
  }
}

function runPenalty(line: boolean[]): number {
  let score = 0;
  let runColor = line[0];
  let runLength = 1;
  for (let i = 1; i < line.length; i++) {
    if (line[i] === runColor) {
      runLength++;
    } else {
      if (runLength >= 5) {
        score += 3 + (runLength - 5);
      }
      runColor = line[i];
      runLength = 1;
    }
  }
  if (runLength >= 5) {
    score += 3 + (runLength - 5);
  }
  return score;
}

function isLightRun(line: boolean[], start: number, length: number): boolean {
  for (let i = 0; i < length; i++) {
    const idx = start + i;
    if (idx >= 0 && idx < line.length && line[idx]) {
      return false;
    }
  }
  return true;
}

const FINDER_LIKE_PATTERN = [true, false, true, true, true, false, true];

function finderPenalty(line: boolean[]): number {
  let score = 0;
  for (let i = 0; i + 6 < line.length; i++) {
    let matches = true;
    for (let k = 0; k < 7; k++) {
      if (line[i + k] !== FINDER_LIKE_PATTERN[k]) {
        matches = false;
        break;
      }
    }
    if (!matches) {
      continue;
    }
    if (isLightRun(line, i - 4, 4) || isLightRun(line, i + 7, 4)) {
      score += 40;
    }
  }
  return score;
}

function computePenalty(matrix: boolean[][], size: number): number {
  let score = 0;

  for (let r = 0; r < size; r++) {
    score += runPenalty(matrix[r]);
    score += finderPenalty(matrix[r]);
  }

  for (let c = 0; c < size; c++) {
    const col: boolean[] = [];
    for (let r = 0; r < size; r++) {
      col.push(matrix[r][c]);
    }
    score += runPenalty(col);
    score += finderPenalty(col);
  }

  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const v = matrix[r][c];
      if (v === matrix[r][c + 1] && v === matrix[r + 1][c] && v === matrix[r + 1][c + 1]) {
        score += 3;
      }
    }
  }

  let dark = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c]) {
        dark++;
      }
    }
  }
  const percentDark = (dark * 100) / (size * size);
  score += Math.floor(Math.abs(percentDark - 50) / 5) * 10;

  return score;
}

// =====================================================================================
// Public API
// =====================================================================================

/**
 * Encodes `text` (as UTF-8, Byte mode) into a QR Code module matrix. Automatically
 * selects the smallest version (1-40) that fits the data at the requested error
 * correction level, and the mask pattern (0-7) with the lowest penalty score.
 */
export function encodeQrCode(text: string, options: NxQrEncodeOptions = {}): NxQrCodeMatrix {
  const errorCorrectionLevel = options.errorCorrectionLevel ?? 'M';
  const dataBytes = Array.from(new TextEncoder().encode(text));

  const version = chooseVersion(dataBytes.length, errorCorrectionLevel, options.minVersion ?? 1);

  const bits = buildBitStream(dataBytes, version, errorCorrectionLevel);
  const codewords = bitsToCodewords(bits);
  const blocks = splitIntoBlocksAndEncode(codewords, version, errorCorrectionLevel);
  const interleaved = interleaveBlocks(blocks);
  const dataBitStream = codewordsToBits(interleaved);

  const size = version * 4 + 17;
  const { matrix: baseMatrix, functionMask } = buildFunctionPatterns(size, version);
  placeDataBits(baseMatrix, functionMask, size, dataBitStream);

  let best: { score: number; matrix: boolean[][]; mask: number } | null = null;
  for (let mask = 0; mask < 8; mask++) {
    const candidate = cloneMatrix(baseMatrix);
    applyMask(candidate, functionMask, size, mask);
    writeFormatInfo(candidate, size, errorCorrectionLevel, mask);
    if (version >= 7) {
      writeVersionInfo(candidate, size, version);
    }
    const score = computePenalty(candidate, size);
    if (!best || score < best.score) {
      best = { score, matrix: candidate, mask };
    }
  }

  // `best` is always assigned - the loop above always runs for mask 0..7.
  const result = best as { score: number; matrix: boolean[][]; mask: number };

  return {
    size,
    modules: result.matrix,
    version,
    errorCorrectionLevel,
    maskPattern: result.mask,
  };
}
