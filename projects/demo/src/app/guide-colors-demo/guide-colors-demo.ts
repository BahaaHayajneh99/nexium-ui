import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { highlightTs } from '../shared/demo-section/ts-highlight';

@Component({
  selector: 'app-guide-colors-demo',
  templateUrl: './guide-colors-demo.html',
  styleUrl: './guide-colors-demo.scss',
})
export class GuideColorsDemo {
  public commonService = inject(CommonService);
  brand = [
    { name: 'primary-color', hex: '#3498db' },
    { name: 'primary-color-dark', hex: '#2980b9' },
    { name: 'primary-color-light', hex: '#5dade2' },
  ];

  status = [
    { name: 'success-color', hex: '#28a745' },
    { name: 'danger-color', hex: '#e74c3c' },
    { name: 'warning-color', hex: '#f39c12' },
    { name: 'info-color', hex: '#17a2b8' },
  ];

  grays = [
    { name: 'gray-50', hex: '#f8f9fa' },
    { name: 'gray-100', hex: '#f1f3f5' },
    { name: 'gray-200', hex: '#e9ecef' },
    { name: 'gray-300', hex: '#dee2e6' },
    { name: 'gray-400', hex: '#ced4da' },
    { name: 'gray-500', hex: '#adb5bd' },
    { name: 'gray-600', hex: '#6c757d' },
    { name: 'gray-700', hex: '#495057' },
    { name: 'gray-800', hex: '#343a40' },
    { name: 'gray-900', hex: '#212529' },
  ];

  usageCode = `// SCSS token (build-time, in a component's own stylesheet)
.my-panel { border-color: $primary-color; }

// CSS custom property (runtime, works in any stylesheet or inline style)
.my-panel { border-color: var(--primary-color); }`;

  get highlightedUsageCode(): string {
    return highlightTs(this.usageCode);
  }
}
