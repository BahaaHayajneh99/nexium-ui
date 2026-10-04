import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface NxHttpHeader {
  key: string;
  value: string;
}

export interface NxHttpRequestValue {
  method: NxHttpMethod;
  url: string;
  headers: NxHttpHeader[];
  body: string;
}

/** A mini-Postman request builder - method/URL/headers/body - that emits the assembled request rather than sending it itself. */
@Component({
  selector: 'nx-request-builder',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-request-builder.html',
  styleUrl: './ui-request-builder.scss',
})
export class NxRequestBuilder {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value: NxHttpRequestValue = { method: 'GET', url: '', headers: [], body: '' };

  @Output() valueChange = new EventEmitter<NxHttpRequestValue>();
  @Output() send = new EventEmitter<NxHttpRequestValue>();

  readonly methods: NxHttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  get showBody(): boolean {
    return this.value.method !== 'GET' && this.value.method !== 'DELETE';
  }

  setMethod(method: NxHttpMethod): void {
    this.update({ method });
  }

  setUrl(url: string): void {
    this.update({ url });
  }

  setBody(body: string): void {
    this.update({ body });
  }

  addHeader(): void {
    this.update({ headers: [...this.value.headers, { key: '', value: '' }] });
  }

  updateHeader(index: number, patch: Partial<NxHttpHeader>): void {
    const headers = this.value.headers.map((header, i) => (i === index ? { ...header, ...patch } : header));
    this.update({ headers });
  }

  removeHeader(index: number): void {
    this.update({ headers: this.value.headers.filter((_, i) => i !== index) });
  }

  private update(patch: Partial<NxHttpRequestValue>): void {
    this.value = { ...this.value, ...patch };
    this.valueChange.emit(this.value);
  }
}
