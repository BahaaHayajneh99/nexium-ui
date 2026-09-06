import { Pipe, PipeTransform } from '@angular/core';

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];

/** Formats a byte count as a human-readable size, e.g. `1536` -> `'1.5 KB'`. */
@Pipe({ name: 'nxFileSize', standalone: true })
export class NxFileSizePipe implements PipeTransform {
  transform(bytes: number | null | undefined, decimals = 1): string {
    if (bytes === null || bytes === undefined || Number.isNaN(bytes)) {
      return '';
    }
    if (bytes === 0) {
      return '0 B';
    }

    const exponent = Math.min(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)), UNITS.length - 1);
    const value = bytes / Math.pow(1024, exponent);

    return `${value.toFixed(exponent === 0 ? 0 : decimals)} ${UNITS[exponent]}`;
  }
}
