import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxEmailBlockType = 'heading' | 'text' | 'image' | 'button' | 'divider' | 'spacer';
export type NxEmailAlign = 'left' | 'center' | 'right';

export interface NxEmailBlock {
  id: string;
  type: NxEmailBlockType;
  text?: string;
  href?: string;
  src?: string;
  alt?: string;
  align?: NxEmailAlign;
  height?: number;
}

let blockCounter = 0;

function createBlock(type: NxEmailBlockType): NxEmailBlock {
  blockCounter += 1;
  const id = `block-${blockCounter}`;
  switch (type) {
    case 'heading':
      return { id, type, text: 'Your heading here', align: 'left' };
    case 'text':
      return { id, type, text: 'Add your message here. Click to edit this text block.', align: 'left' };
    case 'image':
      return { id, type, src: 'https://via.placeholder.com/560x200', alt: 'Image', align: 'center' };
    case 'button':
      return { id, type, text: 'Call to action', href: '#', align: 'center' };
    case 'divider':
      return { id, type };
    case 'spacer':
      return { id, type, height: 24 };
  }
}

const BLOCK_LABELS: Record<NxEmailBlockType, string> = {
  heading: 'Heading',
  text: 'Text',
  image: 'Image',
  button: 'Button',
  divider: 'Divider',
  spacer: 'Spacer',
};

const BLOCK_ICONS: Record<NxEmailBlockType, string> = {
  heading: 'nx-bookmark',
  text: 'nx-file',
  image: 'nx-image',
  button: 'nx-link',
  divider: 'nx-minus',
  spacer: 'nx-more-horizontal',
};

/** A block-based email template builder - add/reorder/edit blocks, then export clean, inline-styled HTML. */
@Component({
  selector: 'nx-email-template-builder',
  standalone: true,
  imports: [FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-email-template-builder.html',
  styleUrl: './ui-email-template-builder.scss',
})
export class NxEmailTemplateBuilder {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so `selectedBlock`/`exportHtml` below - which are
  // `computed()`s reading `this.blocks` - actually re-run when addBlock()/removeBlock()/moveUp()/
  // moveDown()/updateSelected() reassign it, instead of permanently caching the first-read value.
  private readonly blocksSignal = signal<NxEmailBlock[]>([]);
  @Input()
  get blocks(): NxEmailBlock[] {
    return this.blocksSignal();
  }
  set blocks(value: NxEmailBlock[]) {
    this.blocksSignal.set(value);
  }
  @Output() blocksChange = new EventEmitter<NxEmailBlock[]>();

  readonly blockTypes: NxEmailBlockType[] = ['heading', 'text', 'image', 'button', 'divider', 'spacer'];
  readonly blockLabels = BLOCK_LABELS;
  readonly blockIcons = BLOCK_ICONS;

  selectedId = signal<string | null>(null);
  showExport = signal(false);

  readonly selectedBlock = computed(() => this.blocks.find((b) => b.id === this.selectedId()) ?? null);

  addBlock(type: NxEmailBlockType): void {
    const block = createBlock(type);
    this.blocks = [...this.blocks, block];
    this.selectedId.set(block.id);
    this.emit();
  }

  removeBlock(id: string): void {
    this.blocks = this.blocks.filter((b) => b.id !== id);
    if (this.selectedId() === id) {
      this.selectedId.set(null);
    }
    this.emit();
  }

  selectBlock(id: string): void {
    this.selectedId.set(id);
  }

  moveUp(id: string): void {
    const index = this.blocks.findIndex((b) => b.id === id);
    if (index <= 0) return;
    const next = [...this.blocks];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    this.blocks = next;
    this.emit();
  }

  moveDown(id: string): void {
    const index = this.blocks.findIndex((b) => b.id === id);
    if (index === -1 || index >= this.blocks.length - 1) return;
    const next = [...this.blocks];
    [next[index + 1], next[index]] = [next[index], next[index + 1]];
    this.blocks = next;
    this.emit();
  }

  updateSelected(patch: Partial<NxEmailBlock>): void {
    const id = this.selectedId();
    if (!id) return;
    this.blocks = this.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b));
    this.emit();
  }

  private emit(): void {
    this.blocksChange.emit(this.blocks);
  }

  readonly exportHtml = computed(() => {
    const body = this.blocks.map((block) => this.renderBlockHtml(block)).join('\n');
    return `<!doctype html>\n<html>\n  <body style="margin:0;padding:0;background-color:#f4f4f5;">\n    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;">\n      <tr>\n        <td align="center" style="padding:24px 0;">\n          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">\n            <tr>\n              <td style="padding:32px;font-family:Arial,Helvetica,sans-serif;">\n${body}\n              </td>\n            </tr>\n          </table>\n        </td>\n      </tr>\n    </table>\n  </body>\n</html>`;
  });

  copyExport(): void {
    navigator.clipboard?.writeText(this.exportHtml()).catch(() => {});
  }

  private renderBlockHtml(block: NxEmailBlock): string {
    const align = block.align ?? 'left';
    switch (block.type) {
      case 'heading':
        return `                <h2 style="margin:0 0 16px;text-align:${align};font-size:22px;color:#1a1a1a;">${block.text ?? ''}</h2>`;
      case 'text':
        return `                <p style="margin:0 0 16px;text-align:${align};font-size:14px;line-height:1.6;color:#4a4a4a;">${block.text ?? ''}</p>`;
      case 'image':
        return `                <div style="text-align:${align};margin:0 0 16px;"><img src="${block.src ?? ''}" alt="${block.alt ?? ''}" style="max-width:100%;border-radius:6px;" /></div>`;
      case 'button':
        return `                <div style="text-align:${align};margin:0 0 16px;"><a href="${block.href ?? '#'}" style="display:inline-block;padding:12px 24px;background-color:#3498db;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">${block.text ?? ''}</a></div>`;
      case 'divider':
        return `                <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />`;
      case 'spacer':
        return `                <div style="height:${block.height ?? 24}px;"></div>`;
    }
  }
}
