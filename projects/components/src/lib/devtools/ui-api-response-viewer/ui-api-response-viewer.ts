import { Component, Input, signal } from '@angular/core';
import { NxHttpStatus } from '../ui-http-status';
import { NxJsonViewer } from '../../data-display/ui-json-viewer';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxApiResponse {
  status: number;
  statusText?: string;
  headers?: Record<string, string>;
  body?: unknown;
  durationMs?: number;
}

/** A Postman-style response panel: status badge, timing, and tabbed body/headers views. */
@Component({
  selector: 'nx-api-response-viewer',
  standalone: true,
  imports: [NxHttpStatus, NxJsonViewer, NxProLocked],
  templateUrl: './ui-api-response-viewer.html',
  styleUrl: './ui-api-response-viewer.scss',
})
export class NxApiResponseViewer {
  protected readonly licensed = nxProLicenseGranted();

  @Input() response: NxApiResponse = { status: 200 };

  activeTab = signal<'body' | 'headers'>('body');

  get headerEntries(): [string, string][] {
    return Object.entries(this.response.headers ?? {});
  }

  get bodyIsObject(): boolean {
    return typeof this.response.body === 'object' && this.response.body !== null;
  }
}
