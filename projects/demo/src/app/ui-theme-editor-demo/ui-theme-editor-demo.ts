import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxThemeEditor, NxThemeTokens } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-theme-editor-demo',
  imports: [NxThemeEditor, DemoSection],
  templateUrl: './ui-theme-editor-demo.html',
  styleUrl: './ui-theme-editor-demo.scss',
})
export class UiThemeEditorDemo {
  importCode = `import { NxThemeEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  theme: NxThemeTokens = { primaryColor: '#3b82f6', radius: 8, fontFamily: 'Inter, sans-serif' };

  onThemeChange(value: NxThemeTokens): void {
    this.theme = value;
  }

  basicCode = `<nx-theme-editor [value]="theme" (valueChange)="onThemeChange($event)"></nx-theme-editor>`;

  basicTs = `theme: NxThemeTokens = { primaryColor: '#3b82f6', radius: 8, fontFamily: 'Inter, sans-serif' };

onThemeChange(value: NxThemeTokens): void {
  this.theme = value;
}`;

  brandTheme: NxThemeTokens = { primaryColor: '#ef4444', radius: 20, fontFamily: 'Georgia, serif' };

  onBrandThemeChange(value: NxThemeTokens): void {
    this.brandTheme = value;
  }

  presetCode = `<nx-theme-editor [value]="brandTheme" (valueChange)="onBrandThemeChange($event)"></nx-theme-editor>`;

  presetTs = `brandTheme: NxThemeTokens = { primaryColor: '#ef4444', radius: 20, fontFamily: 'Georgia, serif' };

onBrandThemeChange(value: NxThemeTokens): void {
  this.brandTheme = value;
}`;

  applyCode = `<nx-theme-editor [value]="theme" (valueChange)="onThemeChange($event)"></nx-theme-editor>

<button
    [style.background]="theme.primaryColor"
    [style.border-radius.px]="theme.radius"
    [style.font-family]="theme.fontFamily">
    Uses the same tokens
</button>`;

  applyTs = `// Reuse the same NxThemeTokens elsewhere on the page by binding to its fields directly.`;
}
