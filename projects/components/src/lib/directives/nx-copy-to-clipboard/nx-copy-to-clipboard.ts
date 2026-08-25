import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

/** Copies its bound text to the clipboard on click, with a manual-selection fallback for insecure contexts. */
@Directive({
  selector: '[nxCopyToClipboard]',
  standalone: true,
})
export class NxCopyToClipboard {
  @Input({ required: true }) nxCopyToClipboard = '';

  @Output() nxCopied = new EventEmitter<string>();
  @Output() nxCopyFailed = new EventEmitter<Error>();

  @HostListener('click')
  onClick(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.nxCopyToClipboard).then(
        () => this.nxCopied.emit(this.nxCopyToClipboard),
        () => this.copyWithFallback(),
      );
    } else {
      this.copyWithFallback();
    }
  }

  private copyWithFallback(): void {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = this.nxCopyToClipboard;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.nxCopied.emit(this.nxCopyToClipboard);
    } catch (error) {
      this.nxCopyFailed.emit(error as Error);
    }
  }
}
