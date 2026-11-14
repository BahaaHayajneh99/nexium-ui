import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxCopyToClipboard } from '../../directives/nx-copy-to-clipboard';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** Clauses that always start a new, unindented line. */
const CLAUSE_KEYWORDS = [
  'SELECT',
  'FROM',
  'WHERE',
  'LEFT JOIN',
  'RIGHT JOIN',
  'INNER JOIN',
  'OUTER JOIN',
  'JOIN',
  'GROUP BY',
  'ORDER BY',
  'HAVING',
  'LIMIT',
  'INSERT INTO',
  'VALUES',
  'UPDATE',
  'SET',
  'DELETE',
];

/**
 * All keywords that get uppercased, longest-first and combined into a single alternation so a
 * multi-word keyword (e.g. "LEFT JOIN") is matched and consumed whole, instead of a later pass for
 * the shorter "JOIN" re-matching (and corrupting) the tail of a keyword an earlier pass already
 * handled - the classic bug with looping separate find/replace passes over substrings of each other.
 */
const ALL_KEYWORDS_BY_LENGTH = [...CLAUSE_KEYWORDS, 'ON', 'AND', 'OR', 'AS'].sort((a, b) => b.length - a.length);
const KEYWORD_REGEX = new RegExp(`\\b(${ALL_KEYWORDS_BY_LENGTH.join('|')})\\b`, 'gi');

/** Clause/AND/OR keywords, longest-first, combined the same way for the line-break pass below. */
const BREAK_KEYWORDS_BY_LENGTH = [...CLAUSE_KEYWORDS, 'AND', 'OR'].sort((a, b) => b.length - a.length);
const BREAK_REGEX = new RegExp(`\\s*\\b(${BREAK_KEYWORDS_BY_LENGTH.join('|')})\\b`, 'g');

const INDENT = '  ';

function uppercaseKeywords(sql: string): string {
  return sql.replace(KEYWORD_REGEX, (match) => match.toUpperCase());
}

/** Splits a SELECT column list on top-level commas (ignoring commas nested inside parentheses). */
function splitColumns(columnList: string): string[] {
  const columns: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of columnList) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      columns.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) columns.push(current.trim());
  return columns;
}

/**
 * Rule-based SQL formatter - not a real parser/tokenizer, just: uppercase known keywords, break
 * before each major clause, indent continuation lines, and expand long SELECT column lists onto
 * their own indented lines. Good enough for realistic single-line queries; not spec-complete.
 */
export function formatSql(raw: string): string {
  const collapsed = raw.replace(/\s+/g, ' ').trim();
  if (!collapsed) return '';

  const uppercased = uppercaseKeywords(collapsed);

  // Insert a newline marker before each clause keyword, and also before AND/OR (which get indented
  // as continuation lines in the final pass below). A single alternation (see BREAK_REGEX) so e.g.
  // "LEFT JOIN" is consumed whole rather than also partially re-matched by "JOIN".
  const marked = uppercased.replace(BREAK_REGEX, (_match, keyword) => `\n${keyword}`);

  const lines = marked
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const output: string[] = [];
  for (const line of lines) {
    const clauseMatch = CLAUSE_KEYWORDS.find((keyword) => line === keyword || line.startsWith(`${keyword} `));
    if (!clauseMatch) {
      output.push(line);
      continue;
    }

    const rest = line.slice(clauseMatch.length).trim();

    if (clauseMatch === 'SELECT' && rest) {
      const columns = splitColumns(rest);
      if (columns.length > 3) {
        output.push('SELECT');
        columns.forEach((column, index) => {
          const suffix = index < columns.length - 1 ? ',' : '';
          output.push(`${INDENT}${column}${suffix}`);
        });
        continue;
      }
    }

    output.push(rest ? `${clauseMatch} ${rest}` : clauseMatch);
  }

  // Indent AND/OR continuation lines that follow a WHERE/HAVING/ON clause.
  const final: string[] = [];
  for (let i = 0; i < output.length; i++) {
    const line = output[i];
    if (/^(AND|OR)\b/.test(line) && final.length > 0) {
      final.push(`${INDENT}${line}`);
    } else {
      final.push(line);
    }
  }

  return final.join('\n');
}

/**
 * Formats raw/minified SQL with a simple rule-based formatter (no external library): a textarea
 * for input, a "Format" button, and a read-only, copy-to-clipboard output block.
 */
@Component({
  selector: 'nx-sql-formatter',
  standalone: true,
  imports: [NxIcon, NxCopyToClipboard, NxProLocked],
  templateUrl: './ui-sql-formatter.html',
  styleUrl: './ui-sql-formatter.scss',
})
export class NxSqlFormatter implements OnInit {
  protected readonly licensed = nxProLicenseGranted();

  @Input() sql = '';

  @Output() formatted = new EventEmitter<string>();

  protected readonly sqlText = signal('');
  protected readonly formattedSql = signal('');
  protected readonly copied = signal(false);

  ngOnInit(): void {
    this.sqlText.set(this.sql);
  }

  onSqlChange(value: string): void {
    this.sqlText.set(value);
  }

  format(): void {
    const result = formatSql(this.sqlText());
    this.formattedSql.set(result);
    this.formatted.emit(result);
  }

  onCopied(): void {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
