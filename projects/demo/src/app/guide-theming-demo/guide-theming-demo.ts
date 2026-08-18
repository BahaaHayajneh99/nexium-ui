import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-guide-theming-demo',
  templateUrl: './guide-theming-demo.html',
})
export class GuideThemingDemo {
  public commonService = inject(CommonService);
  tokensCode = `// Colors
$primary-color, $danger-color, $success-color, $warning-color
$gray-100 ... $gray-900

// Spacing
$spacing-xs, $spacing-sm, $spacing-md, $spacing-lg, $spacing-xl

// Radius
$radius-xs, $radius-sm, $radius-md, $radius-lg, $radius-xl, $radius-round

// Typography
$font-size-xs, $font-size-sm, $font-size-md, $font-size-lg, $font-size-xl

// Motion
$transition-fast, $transition-normal, $transition-slow`;

  usageCode = `@use '../../../../../demo/src/app/variables.scss' as *;

.my-panel {
  border: 1px solid $gray-300;
  border-radius: $radius-md;
  padding: $spacing-md;
  transition: border-color $transition-fast;
}`;

  overrideCode = `// Override a token before importing ${this.commonService.appName}'s variables to re-theme every
// component that reads from it.
$primary-color: #7c3aed;`;
}
