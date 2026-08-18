/**
 * Lightweight syntax highlighter for the TypeScript snippets shown in the
 * "TS" tab of demo pages. Not a full parser - regex-based, tuned for the
 * subset of syntax used in Nexium component-class snippets.
 */
const KEYWORDS = [
  'import', 'export', 'from', 'default', 'class', 'interface', 'extends', 'implements',
  'constructor', 'public', 'private', 'protected', 'readonly', 'static', 'async', 'await',
  'return', 'new', 'this', 'typeof', 'void', 'let', 'const', 'var', 'function', 'get', 'set',
  'if', 'else', 'for', 'while', 'of', 'in', 'instanceof', 'as', 'type', 'enum', 'namespace',
  'declare', 'abstract', 'super', 'try', 'catch', 'finally', 'throw', 'yield', 'switch', 'case',
  'break', 'continue', 'do', 'true', 'false', 'null', 'undefined', 'string', 'number', 'boolean',
  'any', 'unknown', 'never',
];

export function highlightTs(source: string): string {
  const escaped = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  interface Token { cls: string; text: string; }
  const tokens: Token[] = [];
  const protect = (cls: string, text: string): string => {
    tokens.push({ cls, text });
    return `\u0000${tokens.length - 1}\u0000`;
  };

  // String literals must be protected before comments - otherwise a `//` inside
  // a string (e.g. a URL like `https://...`) gets misread as a line comment,
  // swallowing the rest of the line and corrupting the match after it.
  let result = escaped.replace(/'[^']*'|"[^"]*"|`[^`]*`/g, (match) =>
    protect('language-ts-string', match)
  );

  // Comments
  result = result.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, (match) =>
    protect('language-ts-comment', match)
  );

  // Import-path strings: re-tag the already-protected string right after `from`.
  result = result.replace(/\bfrom(\s+)\u0000(\d+)\u0000/g, (_match, space: string, index: string) => {
    tokens[Number(index)].cls = 'language-ts-import-path';
    return `from${space}\u0000${index}\u0000`;
  });

  // Decorators, e.g. @Component
  result = result.replace(/@[A-Za-z_$][\w$]*/g, (match) =>
    protect('language-ts-decorator', match)
  );

  // PascalCase identifiers - class/interface names and type references
  result = result.replace(/\b[A-Z][A-Za-z0-9_$]*\b/g, (match) =>
    protect('language-ts-class-name', match)
  );

  // Object/property keys and typed parameter names, e.g. `header:` or `event:`
  result = result.replace(/\b([A-Za-z_$][\w$]*)(\s*:)/g, (_match, name: string, colon: string) =>
    `${protect('language-ts-prop', name)}${colon}`
  );

  // Keywords
  const keywordPattern = new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g');
  result = result.replace(keywordPattern, (match) => `<span class="language-ts-keyword">${match}</span>`);

  return result.replace(/\u0000(\d+)\u0000/g, (_match, index: string) => {
    const token = tokens[Number(index)];
    return `<span class="${token.cls}">${token.text}</span>`;
  });
}
