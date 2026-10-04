import { Component, computed, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxEnvironmentSwitcher, NxEnvironment } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-environment-switcher-demo',
  imports: [NxEnvironmentSwitcher, DemoSection],
  templateUrl: './ui-environment-switcher-demo.html',
  styleUrl: './ui-environment-switcher-demo.scss',
})
export class UiEnvironmentSwitcherDemo {
  importCode = `import { NxEnvironmentSwitcher, NxEnvironment } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  environments: NxEnvironment[] = [
    { id: 'dev', label: 'Development', color: '#3b82f6' },
    { id: 'staging', label: 'Staging', color: '#f5a623' },
    { id: 'prod', label: 'Production', color: '#e74c3c' },
  ];

  activeId = signal('dev');

  selectedLabel = computed(() => this.environments.find((env) => env.id === this.activeId())?.label ?? '');

  basicCode = `<nx-environment-switcher
    [environments]="environments"
    [activeId]="activeId"
    (activeIdChange)="activeId = $event">
</nx-environment-switcher>`;

  basicTs = `environments: NxEnvironment[] = [
  { id: 'dev', label: 'Development', color: '#3b82f6' },
  { id: 'staging', label: 'Staging', color: '#f5a623' },
  { id: 'prod', label: 'Production', color: '#e74c3c' },
];

activeId = 'dev';`;

  selectedCode = `<p>Currently viewing: {{ selectedLabel }}</p>`;

  selectedTs = `selectedLabel = computed(() =>
  environments.find((env) => env.id === activeId())?.label
);`;

  onActiveIdChange(id: string): void {
    this.activeId.set(id);
  }
}
