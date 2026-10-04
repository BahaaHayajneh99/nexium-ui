import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxTokenCounter } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-token-counter-demo',
  imports: [NxTokenCounter, FormsModule, DemoSection],
  templateUrl: './ui-token-counter-demo.html',
  styleUrl: './ui-token-counter-demo.scss',
})
export class UiTokenCounterDemo {
  importCode = `import { NxTokenCounter } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  liveText = 'Type or paste a prompt here to see its estimated token count update live.';
  liveCode = `<textarea [(ngModel)]="text"></textarea>
<nx-token-counter [text]="text"></nx-token-counter>`;
  liveTs = `text = 'Type or paste a prompt here to see its estimated token count update live.';`;

  limitedText =
    'This sample prompt is deliberately long so that, against a small limit, you can see the progress bar first turn amber once you are past 80% of the budget, then red once you reach or exceed it entirely.';
  limitedCode = `<nx-token-counter [text]="text" [limit]="40"></nx-token-counter>`;
  limitedTs = `text = 'This sample prompt is deliberately long...';
limit = 40;`;
}
