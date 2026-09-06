import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats a date using simple tokens: `yyyy`, `MM`, `dd`, `HH`, `mm`, `ss`.
 * Unlike Angular's built-in `date` pipe, this ships no locale data - just the tokens above.
 */
@Pipe({ name: 'nxDateFormat', standalone: true })
export class NxDateFormatPipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined, format = 'yyyy-MM-dd'): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const pad = (n: number) => n.toString().padStart(2, '0');
    const tokens: Record<string, string> = {
      yyyy: date.getFullYear().toString(),
      MM: pad(date.getMonth() + 1),
      dd: pad(date.getDate()),
      HH: pad(date.getHours()),
      mm: pad(date.getMinutes()),
      ss: pad(date.getSeconds()),
    };

    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (token) => tokens[token]);
  }
}
