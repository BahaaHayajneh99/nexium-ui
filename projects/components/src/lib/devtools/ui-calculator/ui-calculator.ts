import { Component, computed, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxCalcMode = 'standard' | 'scientific';
export type NxCalcAngleMode = 'deg' | 'rad';

export interface NxCalcHistoryEntry {
  expression: string;
  result: string;
  timestamp: number;
}

interface NxCalcButton {
  label: string;
  insert?: string;
  action?: 'clear' | 'backspace' | 'equals' | 'sign' | 'mc' | 'mr' | 'm-plus' | 'm-minus';
  variant: 'num' | 'op' | 'func' | 'equals' | 'clear' | 'mem';
}

type NxCalcTokenType = 'number' | 'op' | 'lparen' | 'rparen' | 'factorial' | 'ident';

interface NxCalcToken {
  type: NxCalcTokenType;
  value: string;
}

const FUNCTION_NAMES = new Set(['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt', 'exp', 'abs']);

const OPERATOR_SYMBOLS: Record<string, string> = { '−': '-', '×': '*', '÷': '/' };

function tokenize(input: string): NxCalcToken[] {
  const tokens: NxCalcToken[] = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (ch === ' ') {
      i++;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      let j = i + 1;
      while (j < input.length && /[0-9.]/.test(input[j])) j++;
      tokens.push({ type: 'number', value: input.slice(i, j) });
      i = j;
      continue;
    }
    if (ch === 'π') {
      tokens.push({ type: 'ident', value: 'π' });
      i++;
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) {
      let j = i + 1;
      while (j < input.length && /[a-zA-Z]/.test(input[j])) j++;
      tokens.push({ type: 'ident', value: input.slice(i, j) });
      i = j;
      continue;
    }
    if (ch === '(') {
      tokens.push({ type: 'lparen', value: ch });
      i++;
      continue;
    }
    if (ch === ')') {
      tokens.push({ type: 'rparen', value: ch });
      i++;
      continue;
    }
    if (ch === '!') {
      tokens.push({ type: 'factorial', value: ch });
      i++;
      continue;
    }
    if (ch in OPERATOR_SYMBOLS || '+-*/%^'.includes(ch)) {
      tokens.push({ type: 'op', value: OPERATOR_SYMBOLS[ch] ?? ch });
      i++;
      continue;
    }
    throw new Error(`Unexpected character "${ch}"`);
  }
  return tokens;
}

function toRadians(value: number, angleMode: NxCalcAngleMode): number {
  return angleMode === 'deg' ? (value * Math.PI) / 180 : value;
}

function fromRadians(value: number, angleMode: NxCalcAngleMode): number {
  return angleMode === 'deg' ? (value * 180) / Math.PI : value;
}

function factorial(value: number): number {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error('Factorial requires a non-negative whole number');
  }
  if (value > 170) {
    throw new Error('Factorial result is too large');
  }
  let result = 1;
  for (let i = 2; i <= value; i++) {
    result *= i;
  }
  return result;
}

function applyFunction(name: string, arg: number, angleMode: NxCalcAngleMode): number {
  switch (name) {
    case 'sin':
      return Math.sin(toRadians(arg, angleMode));
    case 'cos':
      return Math.cos(toRadians(arg, angleMode));
    case 'tan':
      return Math.tan(toRadians(arg, angleMode));
    case 'asin':
      return fromRadians(Math.asin(arg), angleMode);
    case 'acos':
      return fromRadians(Math.acos(arg), angleMode);
    case 'atan':
      return fromRadians(Math.atan(arg), angleMode);
    case 'log':
      return Math.log10(arg);
    case 'ln':
      return Math.log(arg);
    case 'sqrt':
      if (arg < 0) throw new Error('Square root of a negative number');
      return Math.sqrt(arg);
    case 'exp':
      return Math.exp(arg);
    case 'abs':
      return Math.abs(arg);
    default:
      throw new Error(`Unknown function "${name}"`);
  }
}

/**
 * Recursive-descent parser over +,-,*,/,%,^ (right-assoc), !, parentheses, sin/cos/tan/
 * asin/acos/atan/log/ln/sqrt/exp/abs, and the constants π/e. Deliberately not `eval`/`Function`,
 * since the expression is built from user input (button presses or keyboard).
 *
 * Grammar (lowest to highest precedence), structured so a leading unary minus binds looser than
 * `^` - matching standard math convention (`-2^2` is `-4`, not `4`) while `^` stays right-assoc:
 *   expression := term (('+' | '-') term)*
 *   term       := unary (('*' | '/' | '%') unary)*
 *   unary      := ('-' | '+') unary | power
 *   power      := postfix ('^' unary)?
 *   postfix    := primary ('!')*
 *   primary    := number | 'π' | 'e' | FUNC '(' expression ')' | '(' expression ')'
 */
class NxCalcParser {
  private pos = 0;

  constructor(
    private readonly tokens: NxCalcToken[],
    private readonly angleMode: NxCalcAngleMode,
  ) {}

  parse(): number {
    if (this.tokens.length === 0) {
      throw new Error('Empty expression');
    }
    const value = this.parseExpression();
    if (this.pos < this.tokens.length) {
      throw new Error(`Unexpected "${this.tokens[this.pos].value}"`);
    }
    return value;
  }

  private peek(): NxCalcToken | undefined {
    return this.tokens[this.pos];
  }

  private parseExpression(): number {
    let value = this.parseTerm();
    for (let tok = this.peek(); tok?.type === 'op' && (tok.value === '+' || tok.value === '-'); tok = this.peek()) {
      this.pos++;
      const rhs = this.parseTerm();
      value = tok.value === '+' ? value + rhs : value - rhs;
    }
    return value;
  }

  private parseTerm(): number {
    let value = this.parseUnary();
    for (
      let tok = this.peek();
      tok?.type === 'op' && (tok.value === '*' || tok.value === '/' || tok.value === '%');
      tok = this.peek()
    ) {
      this.pos++;
      const rhs = this.parseUnary();
      if (tok.value === '*') {
        value *= rhs;
      } else {
        if (rhs === 0) throw new Error('Division by zero');
        value = tok.value === '/' ? value / rhs : value % rhs;
      }
    }
    return value;
  }

  private parseUnary(): number {
    const tok = this.peek();
    if (tok?.type === 'op' && (tok.value === '-' || tok.value === '+')) {
      this.pos++;
      const value = this.parseUnary();
      return tok.value === '-' ? -value : value;
    }
    return this.parsePower();
  }

  private parsePower(): number {
    const base = this.parsePostfix();
    const tok = this.peek();
    if (tok?.type === 'op' && tok.value === '^') {
      this.pos++;
      const exponent = this.parseUnary();
      return Math.pow(base, exponent);
    }
    return base;
  }

  private parsePostfix(): number {
    let value = this.parsePrimary();
    while (this.peek()?.type === 'factorial') {
      this.pos++;
      value = factorial(value);
    }
    return value;
  }

  private parsePrimary(): number {
    const tok = this.peek();
    if (!tok) {
      throw new Error('Unexpected end of expression');
    }

    if (tok.type === 'number') {
      this.pos++;
      const parsed = Number(tok.value);
      if (Number.isNaN(parsed)) throw new Error(`Invalid number "${tok.value}"`);
      return parsed;
    }

    if (tok.type === 'lparen') {
      this.pos++;
      const value = this.parseExpression();
      if (this.peek()?.type !== 'rparen') throw new Error('Missing closing parenthesis');
      this.pos++;
      return value;
    }

    if (tok.type === 'ident') {
      if (tok.value === 'π') {
        this.pos++;
        return Math.PI;
      }
      if (tok.value === 'e') {
        this.pos++;
        return Math.E;
      }
      if (FUNCTION_NAMES.has(tok.value)) {
        this.pos++;
        if (this.peek()?.type !== 'lparen') throw new Error(`Expected "(" after ${tok.value}`);
        this.pos++;
        const arg = this.parseExpression();
        if (this.peek()?.type !== 'rparen') throw new Error('Missing closing parenthesis');
        this.pos++;
        return applyFunction(tok.value, arg, this.angleMode);
      }
      throw new Error(`Unknown identifier "${tok.value}"`);
    }

    throw new Error(`Unexpected "${tok.value}"`);
  }
}

export function evaluateNxCalcExpression(expression: string, angleMode: NxCalcAngleMode): number {
  const tokens = tokenize(expression);
  const value = new NxCalcParser(tokens, angleMode).parse();
  if (!Number.isFinite(value)) {
    throw new Error('Result is not a finite number');
  }
  return value;
}

function formatNxCalcNumber(value: number): string {
  const normalized = Object.is(value, -0) ? 0 : value;
  // Round off float noise (e.g. 0.1 + 0.2) before converting back to a plain string.
  return Number(normalized.toPrecision(12)).toString();
}

const STANDARD_BUTTONS: NxCalcButton[] = [
  { label: 'MC', action: 'mc', variant: 'mem' },
  { label: 'MR', action: 'mr', variant: 'mem' },
  { label: 'M+', action: 'm-plus', variant: 'mem' },
  { label: 'M−', action: 'm-minus', variant: 'mem' },

  { label: 'AC', action: 'clear', variant: 'clear' },
  { label: '⌫', action: 'backspace', variant: 'clear' },
  { label: '%', insert: '%', variant: 'op' },
  { label: '÷', insert: '÷', variant: 'op' },

  { label: '7', insert: '7', variant: 'num' },
  { label: '8', insert: '8', variant: 'num' },
  { label: '9', insert: '9', variant: 'num' },
  { label: '×', insert: '×', variant: 'op' },

  { label: '4', insert: '4', variant: 'num' },
  { label: '5', insert: '5', variant: 'num' },
  { label: '6', insert: '6', variant: 'num' },
  { label: '−', insert: '−', variant: 'op' },

  { label: '1', insert: '1', variant: 'num' },
  { label: '2', insert: '2', variant: 'num' },
  { label: '3', insert: '3', variant: 'num' },
  { label: '+', insert: '+', variant: 'op' },

  { label: '±', action: 'sign', variant: 'op' },
  { label: '0', insert: '0', variant: 'num' },
  { label: '.', insert: '.', variant: 'num' },
  { label: '=', action: 'equals', variant: 'equals' },
];

const SCIENTIFIC_BUTTONS: NxCalcButton[] = [
  { label: 'sin', insert: 'sin(', variant: 'func' },
  { label: 'cos', insert: 'cos(', variant: 'func' },
  { label: 'tan', insert: 'tan(', variant: 'func' },
  { label: 'xʸ', insert: '^', variant: 'func' },

  { label: 'asin', insert: 'asin(', variant: 'func' },
  { label: 'acos', insert: 'acos(', variant: 'func' },
  { label: 'atan', insert: 'atan(', variant: 'func' },
  { label: '√', insert: 'sqrt(', variant: 'func' },

  { label: 'log', insert: 'log(', variant: 'func' },
  { label: 'ln', insert: 'ln(', variant: 'func' },
  { label: '(', insert: '(', variant: 'func' },
  { label: ')', insert: ')', variant: 'func' },

  { label: 'π', insert: 'π', variant: 'func' },
  { label: 'e', insert: 'e', variant: 'func' },
  { label: 'n!', insert: '!', variant: 'func' },
  { label: '|x|', insert: 'abs(', variant: 'func' },
];

const KEY_OPERATORS: Record<string, string> = { '+': '+', '-': '−', '*': '×', '/': '÷', '%': '%', '^': '^', '(': '(', ')': ')' };

/** An expression-based scientific calculator - standard + scientific modes, deg/rad angle switch, memory (MC/MR/M+/M-), a run history, and keyboard input. */
@Component({
  selector: 'nx-calculator',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-calculator.html',
  styleUrl: './ui-calculator.scss',
})
export class NxCalculator {
  protected readonly licensed = nxProLicenseGranted();

  readonly standardButtons = STANDARD_BUTTONS;
  readonly scientificButtons = SCIENTIFIC_BUTTONS;

  readonly mode = signal<NxCalcMode>('standard');
  readonly angleMode = signal<NxCalcAngleMode>('deg');
  readonly expression = signal('');
  readonly history = signal<NxCalcHistoryEntry[]>([]);
  readonly memory = signal(0);
  readonly showHistory = signal(false);
  readonly error = signal<string | null>(null);

  readonly hasMemory = computed(() => this.memory() !== 0);

  readonly preview = computed(() => {
    const expr = this.expression();
    if (!expr) return null;
    try {
      const value = evaluateNxCalcExpression(expr, this.angleMode());
      const formatted = formatNxCalcNumber(value);
      return formatted !== expr ? formatted : null;
    } catch {
      return null;
    }
  });

  setMode(mode: NxCalcMode): void {
    this.mode.set(mode);
  }

  setAngleMode(angleMode: NxCalcAngleMode): void {
    this.angleMode.set(angleMode);
  }

  toggleHistory(): void {
    this.showHistory.update((v) => !v);
  }

  clearHistory(): void {
    this.history.set([]);
  }

  useHistoryEntry(entry: NxCalcHistoryEntry): void {
    this.expression.set(entry.result);
    this.error.set(null);
  }

  press(button: NxCalcButton): void {
    this.error.set(null);
    if (button.insert !== undefined) {
      this.expression.update((expr) => expr + button.insert);
      return;
    }
    switch (button.action) {
      case 'clear':
        this.expression.set('');
        break;
      case 'backspace':
        this.expression.update((expr) => expr.slice(0, -1));
        break;
      case 'equals':
        this.equals();
        break;
      case 'sign':
        this.toggleSign();
        break;
      case 'mc':
        this.memory.set(0);
        break;
      case 'mr':
        this.expression.update((expr) => expr + formatNxCalcNumber(this.memory()));
        break;
      case 'm-plus':
        this.adjustMemory(1);
        break;
      case 'm-minus':
        this.adjustMemory(-1);
        break;
    }
  }

  private toggleSign(): void {
    const expr = this.expression();
    if (!expr) return;
    try {
      const value = evaluateNxCalcExpression(expr, this.angleMode());
      this.expression.set(formatNxCalcNumber(-value));
    } catch {
      // Expression isn't complete enough to evaluate yet - just flip the leading sign instead.
      this.expression.update((e) => (e.startsWith('-') ? e.slice(1) : `-${e}`));
    }
  }

  private adjustMemory(sign: 1 | -1): void {
    const expr = this.expression();
    if (!expr) return;
    try {
      const value = evaluateNxCalcExpression(expr, this.angleMode());
      this.memory.update((m) => m + sign * value);
    } catch {
      // Nothing to add to memory until the current expression evaluates cleanly.
    }
  }

  equals(): void {
    const expr = this.expression();
    if (!expr) return;
    try {
      const value = evaluateNxCalcExpression(expr, this.angleMode());
      const formatted = formatNxCalcNumber(value);
      this.history.update((h) => [{ expression: expr, result: formatted, timestamp: Date.now() }, ...h].slice(0, 50));
      this.expression.set(formatted);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Invalid expression');
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (/^[0-9.]$/.test(key)) {
      this.error.set(null);
      this.expression.update((expr) => expr + key);
      event.preventDefault();
      return;
    }
    if (key in KEY_OPERATORS) {
      this.error.set(null);
      this.expression.update((expr) => expr + KEY_OPERATORS[key]);
      event.preventDefault();
      return;
    }
    if (key === 'Enter' || key === '=') {
      this.equals();
      event.preventDefault();
      return;
    }
    if (key === 'Backspace') {
      this.expression.update((expr) => expr.slice(0, -1));
      event.preventDefault();
      return;
    }
    if (key === 'Escape') {
      this.expression.set('');
      this.error.set(null);
      event.preventDefault();
    }
  }
}
