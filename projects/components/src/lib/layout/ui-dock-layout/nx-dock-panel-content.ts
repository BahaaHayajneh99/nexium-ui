import { Directive, ElementRef, Input, inject } from '@angular/core';

/**
 * Marks a projected element as the content for a specific dock panel, keyed by panel id:
 * `<div nxDockPanelContent="sidebar">...</div>` inside `<nx-dock-layout>`. `NxDockLayout` collects
 * these via `ContentChildren` and physically relocates each element's native node into the slot
 * for its panel's region - plain attribute directives have no `TemplateRef` of their own (only an
 * `<ng-template>` host does), so direct DOM relocation is the straightforward way to project
 * content keyed by a dynamic, per-panel id rather than a static `ng-content select`.
 */
@Directive({
  selector: '[nxDockPanelContent]',
  standalone: true,
})
export class NxDockPanelContent {
  @Input('nxDockPanelContent') panelId = '';
  readonly elementRef = inject(ElementRef<HTMLElement>);
}
