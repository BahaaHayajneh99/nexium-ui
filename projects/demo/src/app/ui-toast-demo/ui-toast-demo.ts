import { Component, inject } from '@angular/core';
import { NxToastService, NxToastContainer } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-toast-demo',
  imports: [NxToastContainer, DemoSection],
  templateUrl: './ui-toast-demo.html',
  styleUrl: './ui-toast-demo.scss',
})
export class UiToastDemo {
  importCode = `import { NxToastService, NxToastContainer } from 'nexium-ui';`;

  private toastService = inject(NxToastService);

  basicCode = `constructor(private toastService: NxToastService) {}

showToast() {
    this.toastService.show('Saved successfully', 'success');
}`;

  basicTs = `private toastService = inject(NxToastService);

showSuccess(): void {
    this.toastService.show('Saved successfully', 'success');
}

showDanger(): void {
    this.toastService.show('Something went wrong', 'danger');
}

showWarning(): void {
    this.toastService.show('Please check your input', 'warning');
}

showInfo(): void {
    this.toastService.show('New update available', 'info');
}`;

  showSuccess(): void {
    this.toastService.show('Saved successfully', 'success');
  }

  showDanger(): void {
    this.toastService.show('Something went wrong', 'danger');
  }

  showWarning(): void {
    this.toastService.show('Please check your input', 'warning');
  }

  showInfo(): void {
    this.toastService.show('New update available', 'info');
  }

  positionCode = `showAt(position: NxToastPosition): void {
    this.toastService.show('Positioned toast', 'info', 3000, position);
}`;

  showAt(position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'): void {
    this.toastService.show(`Toast at ${position}`, 'info', 3000, position);
  }
}
