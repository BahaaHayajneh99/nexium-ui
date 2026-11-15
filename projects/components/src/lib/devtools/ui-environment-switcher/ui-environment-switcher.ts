import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';

export interface NxEnvironment {
  id: string;
  label: string;
  color?: string;
}

/** A segmented control for switching between environments (dev/staging/prod), each with a colored indicator. */
@Component({
  selector: 'nx-environment-switcher',
  standalone: true,
  imports: [NgFor],
  templateUrl: './ui-environment-switcher.html',
  styleUrl: './ui-environment-switcher.scss',
})
export class NxEnvironmentSwitcher {
  @Input() environments: NxEnvironment[] = [];
  @Input() activeId = '';

  @Output() activeIdChange = new EventEmitter<string>();

  select(id: string): void {
    this.activeId = id;
    this.activeIdChange.emit(id);
  }

  trackByEnvId(index: number, env: NxEnvironment): string {
    return env.id;
  }
}
