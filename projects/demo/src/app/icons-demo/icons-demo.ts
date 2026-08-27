import { Component, inject, Inject } from '@angular/core';
import { NxIcon } from '../../../../../dist/components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

interface IconEntry {
  name: string;
  svg: string;
}

@Component({
  selector: 'app-icons-demo',
  templateUrl: './icons-demo.html',
  styleUrl: './icons-demo.scss',
  imports: [NxIcon, DemoSection],
})
export class IconsDemo {
    public commonService = inject(CommonService);
  copiedName: string | null = null;
  searchQuery = ''; 
  primary = this.commonService.colors.primary

  importCode = `import { NxIcon } from 'nexium-ui';`;

  usageCode = `<nx-icon icon="nx-home" variant="svg"></nx-icon>
<nx-icon icon="nx-heart" variant="svg" [size]="32"></nx-icon>`;

  howToCode = `<!-- 1. Click any icon in the grid below to copy its name -->
<!-- 2. Import NxIcon from 'nexium-ui' and add it to your component's imports -->
<!-- 3. Render it, tweaking size/color/variant as needed -->
<nx-icon icon="nx-rocket" variant="svg" [size]="20" color="#6366f1"></nx-icon>

<!-- variant="icon" also prints the name as a label next to the glyph -->
<nx-icon icon="nx-rocket" variant="icon" [size]="20"></nx-icon>`;
  icons: IconEntry[] = [
    {
      name: 'nx-home',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 11L12 4L20 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 10V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-github',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 20L8 17.5C6 18 5.5 16.5 5 16C4.5 15.5 4 15.3 4 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 20V17.87C8 17.3 8.19 16.94 8.41 16.75C6.29 16.5 4.06 15.68 4.06 12C4.06 10.97 4.42 10.13 5 9.47C4.91 9.24 4.6 8.29 5.1 7C5.1 7 5.86 6.76 8 8.16C8.9 7.91 9.85 7.79 10.8 7.79C11.75 7.79 12.7 7.91 13.6 8.16C15.74 6.75 16.5 7 16.5 7C17 8.29 16.69 9.24 16.6 9.47C17.18 10.13 17.54 10.96 17.54 12C17.54 15.69 15.3 16.5 13.18 16.74C13.47 17 13.73 17.5 13.73 18.28V20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-x-twitter',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-facebook',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 8H13.5C12.67 8 12 8.67 12 9.5V11H15L14.5 14H12V21H9V14H7V11H9V9.2C9 6.88 10.88 5 13.2 5H15V8Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-linkedin',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="9" width="3" height="11" fill="currentColor"/>
  <circle cx="5.5" cy="5" r="1.8" fill="currentColor"/>
  <path d="M10 20V9H13V10.5C13.6 9.5 14.7 9 16 9C18.2 9 20 10.5 20 13.3V20H17V13.7C17 12.4 16.2 11.7 15.1 11.7C13.9 11.7 13 12.5 13 13.8V20H10Z" fill="currentColor"/>
</svg>`,
    },
    {
      name: 'nx-rocket',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C12 2 17 5 17 11C17 13.5 16 15.5 15 17L12 22L9 17C8 15.5 7 13.5 7 11C7 5 12 2 12 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <circle cx="12" cy="11" r="2" stroke="currentColor" stroke-width="1.6"/>
</svg>`,
    },
    {
      name: 'nx-compass',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>
  <path d="M15 9L13 13L9 15L11 11L15 9Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-grid',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
  <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
  <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
  <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
</svg>`,
    },
    {
      name: 'nx-star',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 3L14.5 8.5L20.5 9.3L16 13.3L17.2 19.2L12 16.2L6.8 19.2L8 13.3L3.5 9.3L9.5 8.5L12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-fire',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C12 2 6 8 6 13C6 16.5 8.5 19 12 19C15.5 19 18 16.5 18 13C18 11 17 9.5 16 8.5C16 10 15 11 14 11C14.5 9 13.5 6 12 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M12 19C10.5 19 9.5 17.8 9.5 16.3C9.5 15 10.3 14 11 13.3C11 14.5 11.8 15 12.5 15.3C13 15.5 13.5 16 13.5 16.8C13.5 18 12.8 19 12 19Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-info-circle',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>
  <path d="M12 11V17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <circle cx="12" cy="7.5" r="1" fill="currentColor"/>
</svg>`,
    },
    {
      name: 'nx-chevron-right',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-chevron-left',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-chevron-up',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 15L12 9L18 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-chevron-down',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-arrow-left',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-arrow-right',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-arrow-up',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 19V5M12 5L6 11M12 5L18 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-arrow-down',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-search',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8"/>
  <path d="M20 20L15.8 15.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-plus',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-minus',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 12H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-close',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-check',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 13L9.5 17.5L19 6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-check-circle',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>
  <path d="M8 12.5L10.8 15.3L16 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-x-circle',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>
  <path d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-alert-triangle',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 4L21 19H3L12 4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M12 10V14.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <circle cx="12" cy="17" r="0.9" fill="currentColor"/>
</svg>`,
    },
    {
      name: 'nx-help-circle',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>
  <path d="M9.7 9.5C9.9 8.2 11 7.5 12.2 7.7C13.4 7.9 14.2 8.9 14 10C13.8 11 12.7 11.3 12.2 12.1C12 12.5 12 13 12 13.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <circle cx="12" cy="16.5" r="0.9" fill="currentColor"/>
</svg>`,
    },
    {
      name: 'nx-edit',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.5 5.5L18.5 8.5L8 19H5V16L15.5 5.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-trash',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 7H20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M9 7V4.5H15V7" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M6 7L7 19.5C7 20 7.4 20.5 8 20.5H16C16.6 20.5 17 20 17 19.5L18 7" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M10 11V16.5M14 11V16.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-download',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 4V15M12 15L7.5 10.5M12 15L16.5 10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 17V18.5C4 19.3 4.7 20 5.5 20H18.5C19.3 20 20 19.3 20 18.5V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-upload',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 15V4M12 4L7.5 8.5M12 4L16.5 8.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 17V18.5C4 19.3 4.7 20 5.5 20H18.5C19.3 20 20 19.3 20 18.5V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-refresh',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 12C4 7.6 7.6 4 12 4C15 4 17.6 5.7 19 8.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M20 12C20 16.4 16.4 20 12 20C9 20 6.4 18.3 5 15.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M19 4.5V8.5H15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 19.5V15.5H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-copy',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="9" y="9" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
  <path d="M15 9V6.5C15 5.7 14.3 5 13.5 5H5.5C4.7 5 4 5.7 4 6.5V14.5C4 15.3 4.7 16 5.5 16H9" stroke="currentColor" stroke-width="1.6"/>
</svg>`,
    },
    {
      name: 'nx-share',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="18" cy="6" r="2.2" stroke="currentColor" stroke-width="1.6"/>
  <circle cx="6" cy="12" r="2.2" stroke="currentColor" stroke-width="1.6"/>
  <circle cx="18" cy="18" r="2.2" stroke="currentColor" stroke-width="1.6"/>
  <path d="M8 10.8L16 7.2M8 13.2L16 16.8" stroke="currentColor" stroke-width="1.6"/>
</svg>`,
    },
    {
      name: 'nx-filter',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 5H20L14 12.5V18L10 20V12.5L4 5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-settings',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.6"/>
  <path d="M12 3V5.5M12 18.5V21M21 12H18.5M5.5 12H3M18 6L16.2 7.8M7.8 16.2L6 18M18 18L16.2 16.2M7.8 7.8L6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-more-horizontal',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="5" cy="12" r="1.4" fill="currentColor"/>
  <circle cx="12" cy="12" r="1.4" fill="currentColor"/>
  <circle cx="19" cy="12" r="1.4" fill="currentColor"/>
</svg>`,
    },
    {
      name: 'nx-more-vertical',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="5" r="1.4" fill="currentColor"/>
  <circle cx="12" cy="12" r="1.4" fill="currentColor"/>
  <circle cx="12" cy="19" r="1.4" fill="currentColor"/>
</svg>`,
    },
    {
      name: 'nx-lock',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
  <path d="M8 11V7.5C8 5.6 9.8 4 12 4C14.2 4 16 5.6 16 7.5V11" stroke="currentColor" stroke-width="1.6"/>
</svg>`,
    },
    {
      name: 'nx-unlock',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
  <path d="M8 11V7.5C8 5.6 9.8 4 12 4C14.2 4 16 5.6 16 7.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-eye',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 12C4.8 8.2 8.1 6 12 6C15.9 6 19.2 8.2 21 12C19.2 15.8 15.9 18 12 18C8.1 18 4.8 15.8 3 12Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.6"/>
</svg>`,
    },
    {
      name: 'nx-eye-off',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 12C4.8 8.2 8.1 6 12 6C15.9 6 19.2 8.2 21 12C19.2 15.8 15.9 18 12 18C8.1 18 4.8 15.8 3 12Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.6"/>
  <path d="M4 20L20 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-heart',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 20C12 20 4 15.5 4 9.8C4 7 6.2 5 8.7 5C10.2 5 11.4 5.8 12 7C12.6 5.8 13.8 5 15.3 5C17.8 5 20 7 20 9.8C20 15.5 12 20 12 20Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-bookmark',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 4.5H18V20L12 16L6 20V4.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-bell',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 10.5C6 7.5 8.2 5 12 5C15.8 5 18 7.5 18 10.5C18 15 19.5 16 19.5 16.5H4.5C4.5 16 6 15 6 10.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M10 19.5C10.3 20.2 11.1 20.7 12 20.7C12.9 20.7 13.7 20.2 14 19.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-flag',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 20V4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M6 5H17.5L14.5 9L17.5 13H6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-link',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.5 14.5L14.5 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M11 6.5L12.5 5C14 3.5 16.3 3.5 17.7 5C19.1 6.4 19.1 8.7 17.7 10.1L16.2 11.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M13 17.5L11.5 19C10 20.5 7.7 20.5 6.3 19C4.9 17.6 4.9 15.3 6.3 13.9L7.8 12.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-external-link',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 5H5.5C4.7 5 4 5.7 4 6.5V18.5C4 19.3 4.7 20 5.5 20H17.5C18.3 20 19 19.3 19 18.5V15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 4H20V11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 4L11 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-save',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 4.5H16L19 7.5V19.5H5V4.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <rect x="8" y="4.5" width="8" height="5" stroke="currentColor" stroke-width="1.6"/>
  <rect x="7.5" y="13" width="9" height="6.5" stroke="currentColor" stroke-width="1.6"/>
</svg>`,
    },
    {
      name: 'nx-menu',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 6.5H20M4 12H20M4 17.5H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-list',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="5" cy="7" r="1.1" fill="currentColor"/>
  <circle cx="5" cy="12" r="1.1" fill="currentColor"/>
  <circle cx="5" cy="17" r="1.1" fill="currentColor"/>
  <path d="M9 7H20M9 12H20M9 17H20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-mail',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
  <path d="M4.5 6.5L12 12.5L19.5 6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-message',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 5.5H20V15.5H9L5.5 18.5V15.5H4V5.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-phone',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 4.5H9L10.5 8.5L8.3 10C9.2 12 11 13.8 13 14.7L14.5 12.5L18.5 14V17C18.5 18.1 17.6 19 16.5 19C10.7 18.6 5.4 13.3 5 7.5C5 6.4 5.9 4.5 6 4.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-send',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 4L4 10.5L10.5 13.5M20 4L13.5 20L10.5 13.5M20 4L10.5 13.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-file',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 3.5H14L18 7.5V20.5H7V3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M14 3.5V7.5H18" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-folder',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.5 6.5C3.5 5.9 4 5.5 4.5 5.5H9.5L11.5 7.5H19.5C20 7.5 20.5 8 20.5 8.5V17.5C20.5 18.1 20 18.5 19.5 18.5H4.5C4 18.5 3.5 18.1 3.5 17.5V6.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-folder-open',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.5 8.5V6.5C3.5 5.9 4 5.5 4.5 5.5H9.5L11.5 7.5H19.5C20 7.5 20.5 8 20.5 8.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M3.5 8.5H21L18.8 17.5C18.7 18.1 18.2 18.5 17.6 18.5H5.9C5.3 18.5 4.8 18.1 4.7 17.5L3.5 8.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-image',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
  <circle cx="8.5" cy="9.5" r="1.6" stroke="currentColor" stroke-width="1.6"/>
  <path d="M4 17L9 12L13 15.5L16 13L20 16.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-video',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3.5" y="6.5" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
  <path d="M15.5 10L20.5 7.5V16.5L15.5 14" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-music',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 17V6L19 4.5V15.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <circle cx="6.5" cy="17.5" r="2.5" stroke="currentColor" stroke-width="1.6"/>
  <circle cx="16.5" cy="16" r="2.5" stroke="currentColor" stroke-width="1.6"/>
</svg>`,
    },
    {
      name: 'nx-paperclip',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 8L9.5 15.5C8.4 16.6 6.6 16.6 5.5 15.5C4.4 14.4 4.4 12.6 5.5 11.5L13.5 3.5C14.2 2.8 15.4 2.8 16.1 3.5C16.8 4.2 16.8 5.4 16.1 6.1L9 13.2C8.7 13.5 8.3 13.5 8 13.2C7.7 12.9 7.7 12.5 8 12.2L14 6.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-user',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.6"/>
  <path d="M4.5 20C5.2 16.5 8.2 14.5 12 14.5C15.8 14.5 18.8 16.5 19.5 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-users',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.6"/>
  <path d="M3 19C3.6 16 5.9 14.3 9 14.3C12.1 14.3 14.4 16 15 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M15.5 5.3C16.9 5.6 18 6.8 18 8.3C18 9.7 16.9 10.9 15.5 11.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M17 14.5C19.3 15 20.8 16.5 21.3 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-user-plus',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="10" cy="8" r="3.5" stroke="currentColor" stroke-width="1.6"/>
  <path d="M3 20C3.7 16.5 6.4 14.5 10 14.5C13.6 14.5 16.3 16.5 17 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M19 6.5V11.5M16.5 9H21.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-monitor',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="4.5" width="18" height="12" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
  <path d="M8 20H16M12 16.5V20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-smartphone',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" stroke-width="1.6"/>
  <path d="M11 18H13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-wifi',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.5 9C8.9 4.3 15.1 4.3 20.5 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M6.5 12.7C9.9 9.7 14.1 9.7 17.5 12.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M9.7 16.3C11 15.1 13 15.1 14.3 16.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <circle cx="12" cy="19" r="1" fill="currentColor"/>
</svg>`,
    },
    {
      name: 'nx-clock',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>
  <path d="M12 7.5V12L15.5 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-map-pin',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 21C12 21 18.5 15 18.5 10C18.5 6.4 15.6 3.5 12 3.5C8.4 3.5 5.5 6.4 5.5 10C5.5 15 12 21 12 21Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <circle cx="12" cy="10" r="2.3" stroke="currentColor" stroke-width="1.6"/>
</svg>`,
    },
    {
      name: 'nx-globe',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>
  <path d="M3 12H21" stroke="currentColor" stroke-width="1.6"/>
  <path d="M12 3C14.5 5.7 15.8 8.8 15.8 12C15.8 15.2 14.5 18.3 12 21C9.5 18.3 8.2 15.2 8.2 12C8.2 8.8 9.5 5.7 12 3Z" stroke="currentColor" stroke-width="1.6"/>
</svg>`,
    },
    {
      name: 'nx-sun',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.6"/>
  <path d="M12 2.5V5M12 19V21.5M21.5 12H19M5 12H2.5M18.5 5.5L16.8 7.2M7.2 16.8L5.5 18.5M18.5 18.5L16.8 16.8M7.2 7.2L5.5 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-moon',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 14.5C18.7 15.3 17.2 15.7 15.6 15.6C10.9 15.4 7.1 11.6 7 6.9C6.9 5.3 7.3 3.8 8 2.5C4.8 3.8 2.5 7 2.5 10.7C2.5 15.7 6.6 19.8 11.6 19.8C15.3 19.8 18.5 17.6 20 14.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-cloud',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 18C4.8 18 3 16.2 3 14C3 12 4.4 10.4 6.3 10.1C6.8 7.5 9.1 5.5 11.9 5.5C15 5.5 17.5 7.9 17.7 11C19.6 11.3 21 13 21 15C21 16.7 19.7 18 18 18H7Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-tag',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.5 3.5H5.5C4.9 3.5 4.5 3.9 4.5 4.5V10.5C4.5 10.8 4.6 11.1 4.8 11.3L13 19.5C13.6 20.1 14.5 20.1 15.1 19.5L19.5 15.1C20.1 14.5 20.1 13.6 19.5 13L11.3 4.8C11.1 4.6 10.8 4.5 10.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <circle cx="8.5" cy="7.5" r="1.1" fill="currentColor"/>
</svg>`,
    },
    {
      name: 'nx-shopping-cart',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.5 4.5H5.5L7.7 14.8C7.8 15.4 8.4 15.8 9 15.8H17C17.6 15.8 18.1 15.4 18.3 14.9L20 8.5H6.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="9.5" cy="19" r="1.3" stroke="currentColor" stroke-width="1.4"/>
  <circle cx="16.5" cy="19" r="1.3" stroke="currentColor" stroke-width="1.4"/>
</svg>`,
    },
    {
      name: 'nx-credit-card',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="6" width="18" height="12" rx="1.8" stroke="currentColor" stroke-width="1.6"/>
  <path d="M3 10H21" stroke="currentColor" stroke-width="1.6"/>
  <path d="M6 14.5H10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,
    },
    {
      name: 'nx-gift',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="9.5" width="16" height="4" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <rect x="5.5" y="13.5" width="13" height="7" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M12 9.5V20.5" stroke="currentColor" stroke-width="1.6"/>
  <path d="M12 9.5C12 9.5 9 9.5 9 7C9 5.6 10.1 4.5 11.5 4.5C12 4.5 12 9.5 12 9.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M12 9.5C12 9.5 15 9.5 15 7C15 5.6 13.9 4.5 12.5 4.5C12 4.5 12 9.5 12 9.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-thumbs-up',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 20H5.5C4.7 20 4 19.3 4 18.5V12.5C4 11.7 4.7 11 5.5 11H7V20Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M7 11L10.5 4.5C11.5 4.5 12.5 5.3 12.5 6.5V9.5H18C18.8 9.5 19.4 10.2 19.3 11L18.3 18.3C18.2 19.2 17.4 20 16.4 20H7" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`,
    },
    {
      name: 'nx-calendar',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
  <path d="M3 9H21" stroke="currentColor" stroke-width="2"/>
  <path d="M8 3V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M16 3V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,
    },
  ];

  get filteredIcons(): IconEntry[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return this.icons;
    }
    return this.icons.filter((icon) => icon.name.includes(query));
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  copyIcon(icon: IconEntry): void {
    this.copiedName = icon.name;
    setTimeout(() => {
      if (this.copiedName === icon.name) {
        this.copiedName = null;
      }
    }, 2000);

    navigator.clipboard.writeText(icon.name).catch(() => this.copyWithFallback(icon.name));
  }

  private copyWithFallback(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
