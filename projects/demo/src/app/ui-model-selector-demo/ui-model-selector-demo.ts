import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxModelSelector, NxAiModel } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

const MODELS: NxAiModel[] = [
  { id: 'nexium-fast', label: 'Nexium Fast', description: 'Optimized for low latency and everyday tasks.', badge: 'Fast' },
  { id: 'nexium-pro', label: 'Nexium Pro', description: 'Stronger reasoning for complex, multi-step requests.', badge: 'Most capable' },
  { id: 'nexium-vision', label: 'Nexium Vision', description: 'Understands images alongside text.', badge: 'Multimodal' },
  { id: 'nexium-code', label: 'Nexium Code', description: 'Tuned for reading and writing source code.' },
  { id: 'nexium-mini', label: 'Nexium Mini', description: 'A compact model for simple, high-volume requests.', badge: 'Economical' },
];

@Component({
  selector: 'app-ui-model-selector-demo',
  imports: [NxModelSelector, DemoSection],
  templateUrl: './ui-model-selector-demo.html',
  styleUrl: './ui-model-selector-demo.scss',
})
export class UiModelSelectorDemo {
  importCode = `import { NxModelSelector } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  models = MODELS;

  preselectedId = 'nexium-pro';
  preselectedCode = `<nx-model-selector [models]="models" [(selectedId)]="selectedId"></nx-model-selector>`;
  preselectedTs = `models = [
  { id: 'nexium-fast', label: 'Nexium Fast', description: '...', badge: 'Fast' },
  { id: 'nexium-pro', label: 'Nexium Pro', description: '...', badge: 'Most capable' },
  { id: 'nexium-vision', label: 'Nexium Vision', description: '...', badge: 'Multimodal' },
  { id: 'nexium-code', label: 'Nexium Code', description: '...' },
  { id: 'nexium-mini', label: 'Nexium Mini', description: '...', badge: 'Economical' },
];
selectedId = 'nexium-pro';`;

  emptyId?: string;
  emptyCode = `<nx-model-selector [models]="models" [(selectedId)]="selectedId"></nx-model-selector>`;
  emptyTs = `selectedId: string | undefined; // nothing selected yet - the trigger shows the placeholder`;
}
