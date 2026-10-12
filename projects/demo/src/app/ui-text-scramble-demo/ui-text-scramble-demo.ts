import { Component } from '@angular/core';
import { NxTextScramble } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-text-scramble-demo',
  imports: [NxTextScramble, DemoSection],
  templateUrl: './ui-text-scramble-demo.html',
  styleUrl: './ui-text-scramble-demo.scss',
})
export class UiTextScrambleDemo {
  importCode = `import { NxTextScramble } from 'nexium-ui';`;

  basicCode = `<nx-text-scramble text="Hello, NexiumUI"></nx-text-scramble>`;

  onChangeCode = `<nx-text-scramble [text]="headline" [duration]="900"></nx-text-scramble>
<button (click)="nextHeadline()">Next headline</button>`;

  manualCode = `<nx-text-scramble #scramble text="Click the button to scramble" [trigger]="'manual'"></nx-text-scramble>
<button (click)="scramble.scramble()">Scramble</button>`;

  private readonly headlines = [
    'Hello, NexiumUI',
    'Standalone Angular Components',
    'Free & Open Source',
    'Build Faster, Ship Sooner',
  ];
  private headlineIndex = 0;
  headline = this.headlines[0];

  nextHeadline(): void {
    this.headlineIndex = (this.headlineIndex + 1) % this.headlines.length;
    this.headline = this.headlines[this.headlineIndex];
  }
}
