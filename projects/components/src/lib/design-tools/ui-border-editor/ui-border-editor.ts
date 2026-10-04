import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxBorderStyle = 'solid' | 'dashed' | 'dotted' | 'double';

export interface NxBorderSides {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface NxBorderRadiusCorners {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

export interface NxBorderValue {
  width: NxBorderSides;
  style: NxBorderStyle;
  color: string;
  radius: NxBorderRadiusCorners;
}

/** A per-side border width/radius editor with linked (all-sides) toggles, style select, and a live preview. */
@Component({
  selector: 'nx-border-editor',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-border-editor.html',
  styleUrl: './ui-border-editor.scss',
})
export class NxBorderEditor {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value: NxBorderValue = {
    width: { top: 1, right: 1, bottom: 1, left: 1 },
    style: 'solid',
    color: '#3b82f6',
    radius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 },
  };

  @Output() valueChange = new EventEmitter<NxBorderValue>();

  linkWidths = signal(true);
  linkRadius = signal(true);

  setWidth(side: keyof NxBorderSides, amount: number): void {
    if (this.linkWidths()) {
      this.update({ width: { top: amount, right: amount, bottom: amount, left: amount } });
    } else {
      this.update({ width: { ...this.value.width, [side]: amount } });
    }
  }

  setRadius(corner: keyof NxBorderRadiusCorners, amount: number): void {
    if (this.linkRadius()) {
      this.update({ radius: { topLeft: amount, topRight: amount, bottomRight: amount, bottomLeft: amount } });
    } else {
      this.update({ radius: { ...this.value.radius, [corner]: amount } });
    }
  }

  setStyle(style: NxBorderStyle): void {
    this.update({ style });
  }

  setColor(color: string): void {
    this.update({ color });
  }

  private update(patch: Partial<NxBorderValue>): void {
    this.value = { ...this.value, ...patch };
    this.valueChange.emit(this.value);
  }
}
