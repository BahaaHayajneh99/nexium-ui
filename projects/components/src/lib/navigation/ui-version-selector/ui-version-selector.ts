import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxDropdownMenu } from '../ui-dropdown-menu';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxVersionTag = 'latest' | 'stable' | 'beta' | 'deprecated';

export interface NxVersionOption {
  label: string;
  value: string;
  tag?: NxVersionTag;
}

/**
 * A dropdown button for switching between versions of something - an app, a doc, an API.
 * Shows the currently selected version with a chevron; opening it lists every option in
 * `versions`, each optionally tagged ('latest' | 'stable' | 'beta' | 'deprecated'). Built on
 * top of `nx-dropdown-menu`'s trigger/content slots so positioning and outside-click handling
 * are shared with the rest of the dropdown family.
 */
@Component({
  selector: 'nx-version-selector',
  standalone: true,
  imports: [NxIcon, NxDropdownMenu, NxProLocked],
  templateUrl: './ui-version-selector.html',
  styleUrl: './ui-version-selector.scss',
})
export class NxVersionSelector {
  protected readonly licensed = nxProLicenseGranted();

  @Input() versions: NxVersionOption[] = [];
  @Input() selected = '';

  @Output() selectedChange = new EventEmitter<string>();

  get selectedOption(): NxVersionOption | undefined {
    return this.versions.find((version) => version.value === this.selected);
  }

  get selectedLabel(): string {
    return (this.selectedOption?.label ?? this.selected) || 'Select version';
  }

  get selectedTag(): NxVersionTag | undefined {
    return this.selectedOption?.tag;
  }

  choose(option: NxVersionOption): void {
    this.selected = option.value;
    this.selectedChange.emit(option.value);
  }
}
