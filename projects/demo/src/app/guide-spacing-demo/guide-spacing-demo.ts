import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-guide-spacing-demo',
  templateUrl: './guide-spacing-demo.html',
  styleUrl: './guide-spacing-demo.scss',
})
export class GuideSpacingDemo {
  public commonService = inject(CommonService);
  scale = [
    { name: 'spacing-xs', value: '4px' },
    { name: 'spacing-sm', value: '8px' },
    { name: 'spacing-md', value: '16px' },
    { name: 'spacing-lg', value: '24px' },
    { name: 'spacing-xl', value: '32px' },
  ];

  utilityCode = `<!-- margin/padding/gap helpers generated for each step (1-5) -->
<div class="mt-3 pb-2">...</div>   <!-- margin-top: $spacing-md; padding-bottom: $spacing-sm -->
<div class="mx-4 gap-2">...</div>  <!-- margin-inline: $spacing-lg; gap: $spacing-sm -->`;
}
