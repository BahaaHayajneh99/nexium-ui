import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { highlightTs } from '../shared/demo-section/ts-highlight';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-getting-started-first-component-demo',
  templateUrl: './getting-started-first-component-demo.html',
  styleUrl: './getting-started-first-component-demo.scss',
  imports: [DemoSection],
})
export class GettingStartedFirstComponentDemo {
  public commonService = inject(CommonService);

  componentCode = `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxButtonComponent } from 'nexium-ui';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, NxButtonComponent],
  template: \`
    <div class="welcome-container">
      <h1>Welcome to {{ appName }}</h1>
      <p>You've successfully set up your first component!</p>
      <button nx-button (click)="sayHello()">Click Me</button>
    </div>
  \`,
  styles: [\`
    .welcome-container {
      padding: 2rem;
      text-align: center;
    }
  \`]
})
export class WelcomeComponent {
  appName = '{{ commonService.appName }}';

  sayHello() {
    alert('Hello from {{ commonService.appName }}!');
  }
}`;

  usageCode = `import { WelcomeComponent } from './welcome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WelcomeComponent],
  template: \`<app-welcome></app-welcome>\`
})
export class AppComponent {}`;

  inputsOutputsCode = `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NxButtonComponent } from 'nexium-ui';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, NxButtonComponent],
  template: \`
    <div class="counter">
      <p>Count: {{ count }}</p>
      <button nx-button (click)="increment()">Increment</button>
      <button nx-button (click)="decrement()">Decrement</button>
      <button nx-button variant="outlined" (click)="onReset()">Reset</button>
    </div>
  \`
})
export class CounterComponent {
  @Input() initialValue: number = 0;
  @Output() onCountChange = new EventEmitter<number>();

  count = this.initialValue;

  increment() {
    this.count++;
    this.onCountChange.emit(this.count);
  }

  decrement() {
    this.count--;
    this.onCountChange.emit(this.count);
  }

  onReset() {
    this.count = this.initialValue;
    this.onCountChange.emit(this.count);
  }
}`;

  get highlightedComponentCode(): string {
    return highlightTs(this.componentCode);
  }

  get highlightedUsageCode(): string {
    return highlightTs(this.usageCode);
  }

  get highlightedInputsOutputsCode(): string {
    return highlightTs(this.inputsOutputsCode);
  }
}
