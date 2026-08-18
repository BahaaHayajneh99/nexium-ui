import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nxTooltip]',
  standalone: true,
})
export class NxTooltip implements OnDestroy {
  @Input('nxTooltip') text = '';
  @Input() nxTooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private tooltipEl: HTMLElement | null = null;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  show(): void {
    if (!this.text || this.tooltipEl) {
      return;
    }

    const tooltip = this.renderer.createElement('span') as HTMLElement;
    const textNode = this.renderer.createText(this.text);
    this.renderer.appendChild(tooltip, textNode);

    this.renderer.setStyle(tooltip, 'position', 'fixed');
    this.renderer.setStyle(tooltip, 'background', '#343a40');
    this.renderer.setStyle(tooltip, 'color', '#ffffff');
    this.renderer.setStyle(tooltip, 'padding', '4px 8px');
    this.renderer.setStyle(tooltip, 'border-radius', '4px');
    this.renderer.setStyle(tooltip, 'font-size', '12px');
    this.renderer.setStyle(tooltip, 'z-index', '9999');
    this.renderer.setStyle(tooltip, 'pointer-events', 'none');
    this.renderer.setStyle(tooltip, 'white-space', 'nowrap');

    this.renderer.appendChild(document.body, tooltip);

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top = hostRect.top;
    let left = hostRect.left;

    switch (this.nxTooltipPosition) {
      case 'top':
        top = hostRect.top - tooltipRect.height - 8;
        left = hostRect.left + hostRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + 8;
        left = hostRect.left + hostRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = hostRect.top + hostRect.height / 2 - tooltipRect.height / 2;
        left = hostRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = hostRect.top + hostRect.height / 2 - tooltipRect.height / 2;
        left = hostRect.right + 8;
        break;
    }

    this.renderer.setStyle(tooltip, 'top', `${top}px`);
    this.renderer.setStyle(tooltip, 'left', `${left}px`);

    this.tooltipEl = tooltip;
  }

  @HostListener('mouseleave')
  hide(): void {
    this.destroyTooltip();
  }

  ngOnDestroy(): void {
    this.destroyTooltip();
  }

  private destroyTooltip(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }
}
