import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-design-system-design-tokens-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './design-system-design-tokens-demo.html',
  styleUrl: './design-system-design-tokens-demo.scss',
})
export class DesignSystemDesignTokensDemo {
  public commonService = inject(CommonService);

  tokens = {
    colors: {
      primary: '#3498db',
      secondary: '#2ecc71',
      success: '#27ae60',
      danger: '#e74c3c',
      warning: '#f39c12',
      info: '#17a2b8',
    },
    spacing: ['0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem', '2rem', '3rem', '4rem'],
    typography: {
      fontSize: ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '40px'],
      fontWeight: ['400', '500', '600', '700'],
      lineHeight: ['1.2', '1.4', '1.6', '1.8'],
    },
    borderRadius: ['2px', '4px', '8px', '12px', '16px', '50%'],
    shadows: [
      'none',
      '0 1px 3px rgba(0, 0, 0, 0.12)',
      '0 2px 6px rgba(0, 0, 0, 0.16)',
      '0 4px 12px rgba(0, 0, 0, 0.20)',
    ],
  };
}
