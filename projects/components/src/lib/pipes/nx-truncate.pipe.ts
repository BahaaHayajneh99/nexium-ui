import { Pipe, PipeTransform } from '@angular/core';

/** Truncates text to a max length, appending an ellipsis when it was cut. */
@Pipe({ name: 'nxTruncate', standalone: true })
export class NxTruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, length = 50, ellipsis = '…'): string {
    if (!value) {
      return '';
    }
    return value.length > length ? value.slice(0, length).trimEnd() + ellipsis : value;
  }
}
