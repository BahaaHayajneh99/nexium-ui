import { Component, Input } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

export type NxDeviceFrameKind = 'phone' | 'tablet' | 'browser';

/** Wraps projected content in a phone/tablet bezel or a browser-chrome frame, for mockup-style previews. */
@Component({
  selector: 'nx-device-frame',
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './ui-device-frame.html',
  styleUrl: './ui-device-frame.scss',
})
export class NxDeviceFrame {
  @Input() kind: NxDeviceFrameKind = 'phone';
  @Input() url = 'https://example.com';
}
