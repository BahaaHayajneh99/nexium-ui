import { Pipe, PipeTransform, inject } from '@angular/core';
import { NxTranslateService } from './nx-translate.service';

/**
 * Translates a dot-notation key using the active language.
 * Marked impure so the output refreshes automatically when `NxTranslateService.use()` is called.
 */
@Pipe({ name: 'nxTranslate', standalone: true, pure: false })
export class NxTranslatePipe implements PipeTransform {
  private readonly translateService = inject(NxTranslateService);

  transform(key: string, params?: Record<string, string | number>): string {
    return this.translateService.instant(key, params);
  }
}
