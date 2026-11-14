import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SEARCH_INDEX } from '../component/search-index';

const FALLBACK_TITLE = 'NexiumUI - Angular UI Component Library';
const FALLBACK_DESCRIPTION =
  'NexiumUI is a standalone Angular UI component library with 300+ free and PRO components - data display, forms, charts, dashboards, developer tools, and more.';

/**
 * Sets a page-specific <title> and meta description on every navigation, instead of every one
 * of the ~300 demo pages sharing the same generic "Demo" title. Driven by SEARCH_INDEX (already
 * maintained for the in-app command palette) so adding a page there covers both features at once.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  private readonly index = new Map(
    SEARCH_INDEX.filter((item) => item.path?.startsWith('/')).map((item) => [item.path!, item]),
  );

  apply(url: string): void {
    const path = url.split('?')[0].split('#')[0];
    const item = this.index.get(path);

    if (!item) {
      this.titleService.setTitle(FALLBACK_TITLE);
      this.setDescription(FALLBACK_DESCRIPTION);
      return;
    }

    this.titleService.setTitle(`${item.label} - NexiumUI`);
    this.setDescription(
      `Angular ${item.label} component with live examples and copy-paste code - part of the ${item.group} ` +
        `category in NexiumUI, a standalone Angular UI library.`,
    );
  }

  private setDescription(content: string): void {
    this.metaService.updateTag({ name: 'description', content });
  }
}
