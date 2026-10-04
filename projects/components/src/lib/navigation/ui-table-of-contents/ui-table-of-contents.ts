import { AfterViewInit, Component, Input, OnDestroy, signal } from '@angular/core';

export interface NxTocHeading {
  id: string;
  label: string;
  /** Nesting depth (1 = top-level, 2 = sub-heading, ...) - controls indentation only. */
  level: number;
}

/**
 * A scroll-spy table of contents. Renders a nested, indented list of links for `headings`, then
 * watches the actual DOM elements elsewhere on the page that share those `id`s with a native
 * `IntersectionObserver`, highlighting whichever heading is currently most visible.
 */
@Component({
  selector: 'nx-table-of-contents',
  standalone: true,
  imports: [],
  templateUrl: './ui-table-of-contents.html',
  styleUrl: './ui-table-of-contents.scss',
})
export class NxTableOfContents implements AfterViewInit, OnDestroy {
  @Input() headings: NxTocHeading[] = [];

  readonly activeId = signal<string | null>(null);

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onLinkClick(event: Event, id: string): void {
    event.preventDefault();
    this.scrollTo(id);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  private setupObserver(): void {
    // Keeps each watched heading's current intersection ratio so that, on every callback,
    // we can pick whichever one is most visible right now rather than just the last one
    // IntersectionObserver happened to report (entries only include elements whose ratio
    // crossed a threshold since the previous callback, not every observed element).
    const visibleRatios = new Map<string, number>();

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          visibleRatios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const heading of this.headings) {
          const ratio = visibleRatios.get(heading.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = heading.id;
          }
        }
        if (bestId) {
          this.activeId.set(bestId);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const heading of this.headings) {
      const el = document.getElementById(heading.id);
      if (el) {
        this.observer.observe(el);
      }
    }
  }
}
