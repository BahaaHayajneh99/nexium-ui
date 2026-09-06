import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-design-system-elevation-demo',
  templateUrl: './design-system-elevation-demo.html',
  styleUrl: './design-system-elevation-demo.scss',
})
export class DesignSystemElevationDemo {
  public commonService = inject(CommonService);

  elevationLevels = [
    { level: '0', zIndex: 'auto', purpose: 'Base layer - page content' },
    { level: '1', zIndex: '100', purpose: 'Floating cards and panels' },
    { level: '2', zIndex: '500', purpose: 'Dropdown menus and popovers' },
    { level: '3', zIndex: '1000', purpose: 'Modal backdrops' },
    { level: '4', zIndex: '1050', purpose: 'Modals and large dialogs' },
    { level: '5', zIndex: '1100', purpose: 'Toasts and notifications' },
  ];
}
