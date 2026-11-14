import { Component, computed, inject, signal } from '@angular/core';
import {
  NxThemeEditor,
  NxThemeTokens,
  NxColorTokenGenerator,
  NxShadowEditor,
  NxShadowValue,
  NxSpacingEditor,
  NxSpacingValue,
  NxBorderEditor,
  NxBorderValue,
  NxInput,
} from 'components';
import { CommonService } from '../services/common.service';

export interface ThemeStudioState {
  brand: NxThemeTokens;
  shadow: NxShadowValue;
  spacing: NxSpacingValue;
  border: NxBorderValue;
}

interface SavedThemePreset {
  name: string;
  state: ThemeStudioState;
}

const STORAGE_KEY = 'nexium-theme-studio-presets';

const DEFAULT_STATE: ThemeStudioState = {
  brand: { primaryColor: '#3b82f6', radius: 8, fontFamily: 'Inter, sans-serif' },
  shadow: { x: 0, y: 4, blur: 12, spread: 0, color: 'rgba(0, 0, 0, 0.25)', inset: false },
  spacing: {
    margin: { top: 16, right: 16, bottom: 16, left: 16 },
    padding: { top: 12, right: 12, bottom: 12, left: 12 },
  },
  border: {
    width: { top: 1, right: 1, bottom: 1, left: 1 },
    style: 'solid',
    color: '#3b82f6',
    radius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 },
  },
};

interface BuiltInPreset {
  name: string;
  state: ThemeStudioState;
}

const BUILT_IN_PRESETS: BuiltInPreset[] = [
  {
    name: 'Default',
    state: DEFAULT_STATE,
  },
  {
    name: 'Ocean',
    state: {
      brand: { primaryColor: '#0ea5e9', radius: 10, fontFamily: 'Inter, sans-serif' },
      shadow: { x: 0, y: 10, blur: 25, spread: -5, color: 'rgba(14, 165, 233, 0.35)', inset: false },
      spacing: {
        margin: { top: 16, right: 16, bottom: 16, left: 16 },
        padding: { top: 16, right: 20, bottom: 16, left: 20 },
      },
      border: {
        width: { top: 1, right: 1, bottom: 1, left: 1 },
        style: 'solid',
        color: '#0ea5e9',
        radius: { topLeft: 14, topRight: 14, bottomRight: 14, bottomLeft: 14 },
      },
    },
  },
  {
    name: 'Sunset',
    state: {
      brand: { primaryColor: '#f97316', radius: 22, fontFamily: 'Georgia, serif' },
      shadow: { x: 0, y: 14, blur: 30, spread: 0, color: 'rgba(249, 115, 22, 0.3)', inset: false },
      spacing: {
        margin: { top: 24, right: 24, bottom: 24, left: 24 },
        padding: { top: 24, right: 28, bottom: 24, left: 28 },
      },
      border: {
        width: { top: 0, right: 0, bottom: 0, left: 0 },
        style: 'solid',
        color: '#f97316',
        radius: { topLeft: 28, topRight: 28, bottomRight: 28, bottomLeft: 28 },
      },
    },
  },
  {
    name: 'Forest',
    state: {
      brand: { primaryColor: '#16a34a', radius: 6, fontFamily: 'Inter, sans-serif' },
      shadow: { x: 0, y: 2, blur: 6, spread: 0, color: 'rgba(22, 101, 52, 0.2)', inset: false },
      spacing: {
        margin: { top: 10, right: 10, bottom: 10, left: 10 },
        padding: { top: 10, right: 12, bottom: 10, left: 12 },
      },
      border: {
        width: { top: 1, right: 1, bottom: 1, left: 1 },
        style: 'solid',
        color: '#166534',
        radius: { topLeft: 6, topRight: 6, bottomRight: 6, bottomLeft: 6 },
      },
    },
  },
  {
    name: 'Midnight Mono',
    state: {
      brand: { primaryColor: '#e5e7eb', radius: 2, fontFamily: 'JetBrains Mono, monospace' },
      shadow: { x: 0, y: 1, blur: 0, spread: 0, color: 'rgba(0, 0, 0, 0.6)', inset: false },
      spacing: {
        margin: { top: 12, right: 12, bottom: 12, left: 12 },
        padding: { top: 10, right: 14, bottom: 10, left: 14 },
      },
      border: {
        width: { top: 1, right: 1, bottom: 1, left: 1 },
        style: 'dashed',
        color: '#9ca3af',
        radius: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 },
      },
    },
  },
];

function cloneState(state: ThemeStudioState): ThemeStudioState {
  return JSON.parse(JSON.stringify(state));
}

/** Merges whatever recognizable fields exist in a partial/imported object into a base state, without crashing on malformed input. */
function mergeState(base: ThemeStudioState, patch: Partial<ThemeStudioState> | null | undefined): ThemeStudioState {
  if (!patch || typeof patch !== 'object') {
    return base;
  }
  return {
    brand: patch.brand ? { ...base.brand, ...patch.brand } : base.brand,
    shadow: patch.shadow ? { ...base.shadow, ...patch.shadow } : base.shadow,
    spacing: patch.spacing
      ? {
          margin: patch.spacing.margin ? { ...base.spacing.margin, ...patch.spacing.margin } : base.spacing.margin,
          padding: patch.spacing.padding ? { ...base.spacing.padding, ...patch.spacing.padding } : base.spacing.padding,
        }
      : base.spacing,
    border: patch.border
      ? {
          ...base.border,
          ...patch.border,
          width: patch.border.width ? { ...base.border.width, ...patch.border.width } : base.border.width,
          radius: patch.border.radius ? { ...base.border.radius, ...patch.border.radius } : base.border.radius,
        }
      : base.border,
  };
}

/**
 * Theme Studio - a flagship demo page that composes the PRO design-tools editors (theme, color
 * scale, shadow, spacing, border) behind a single source-of-truth state signal, with a live
 * scoped preview, built-in presets, "My Themes" saved locally, and JSON/CSS export + JSON import.
 */
@Component({
  selector: 'app-theme-studio',
  imports: [NxThemeEditor, NxColorTokenGenerator, NxShadowEditor, NxSpacingEditor, NxBorderEditor, NxInput],
  templateUrl: './theme-studio.html',
  styleUrl: './theme-studio.scss',
})
export class ThemeStudio {
  public commonService = inject(CommonService);

  readonly presets = BUILT_IN_PRESETS;

  readonly state = signal<ThemeStudioState>(cloneState(DEFAULT_STATE));

  readonly savedPresets = signal<SavedThemePreset[]>(this.readSavedPresets());

  readonly cssExportCopied = signal(false);
  readonly importError = signal<string | null>(null);

  readonly previewFontFamily = computed(() => this.state().brand.fontFamily);
  readonly previewPrimaryColor = computed(() => this.state().brand.primaryColor);
  readonly previewRadius = computed(() => this.state().brand.radius);

  readonly previewBoxShadow = computed(() => {
    const shadow = this.state().shadow;
    return `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
  });

  readonly previewPadding = computed(() => {
    const { top, right, bottom, left } = this.state().spacing.padding;
    return `${top}px ${right}px ${bottom}px ${left}px`;
  });

  readonly previewMargin = computed(() => {
    const { top, right, bottom, left } = this.state().spacing.margin;
    return `${top}px ${right}px ${bottom}px ${left}px`;
  });

  readonly previewBorder = computed(() => {
    const border = this.state().border;
    // All sides share one editable value in this simplified preview; the editor still edits
    // each side independently, so we fall back to the top width when sides diverge.
    return `${border.width.top}px ${border.style} ${border.color}`;
  });

  readonly previewBorderRadius = computed(() => {
    const radius = this.state().border.radius;
    return `${radius.topLeft}px ${radius.topRight}px ${radius.bottomRight}px ${radius.bottomLeft}px`;
  });

  readonly exportCss = computed(() => {
    const s = this.state();
    const lines = [
      `  --shell-primary: ${s.brand.primaryColor};`,
      `  --nx-radius-md: ${s.brand.radius}px;`,
      `  font-family: ${s.brand.fontFamily};`,
      `  --nx-shadow-elevation: ${this.previewBoxShadow()};`,
      `  --nx-spacing-padding: ${this.previewPadding()};`,
      `  --nx-spacing-margin: ${this.previewMargin()};`,
      `  --nx-border-width: ${s.border.width.top}px;`,
      `  --nx-border-style: ${s.border.style};`,
      `  --nx-border-color: ${s.border.color};`,
      `  --nx-border-radius: ${this.previewBorderRadius()};`,
    ];
    return `:root {\n${lines.join('\n')}\n}`;
  });

  onBrandChange(value: NxThemeTokens): void {
    this.state.update((s) => ({ ...s, brand: value }));
  }

  onPrimaryColorChange(hex: string): void {
    this.state.update((s) => ({ ...s, brand: { ...s.brand, primaryColor: hex } }));
  }

  onShadowChange(value: NxShadowValue): void {
    this.state.update((s) => ({ ...s, shadow: value }));
  }

  onSpacingChange(value: NxSpacingValue): void {
    this.state.update((s) => ({ ...s, spacing: value }));
  }

  onBorderChange(value: NxBorderValue): void {
    this.state.update((s) => ({ ...s, border: value }));
  }

  applyPreset(preset: BuiltInPreset | SavedThemePreset): void {
    this.state.set(cloneState(preset.state));
  }

  resetTheme(): void {
    this.state.set(cloneState(DEFAULT_STATE));
  }

  saveCurrentAs(): void {
    const name = window.prompt('Name this theme:');
    if (!name || !name.trim()) {
      return;
    }
    const next = [...this.savedPresets(), { name: name.trim(), state: cloneState(this.state()) }];
    this.savedPresets.set(next);
    this.persistSavedPresets(next);
  }

  deleteSavedPreset(index: number): void {
    const next = this.savedPresets().filter((_, i) => i !== index);
    this.savedPresets.set(next);
    this.persistSavedPresets(next);
  }

  exportJson(): void {
    const json = JSON.stringify(this.state(), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'theme-studio-theme.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  exportCssToClipboard(): void {
    navigator.clipboard
      ?.writeText(this.exportCss())
      .then(() => {
        this.cssExportCopied.set(true);
        setTimeout(() => this.cssExportCopied.set(false), 2000);
      })
      .catch(() => {});
  }

  triggerImport(fileInput: HTMLInputElement): void {
    this.importError.set(null);
    fileInput.click();
  }

  onImportFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    file
      .text()
      .then((text) => {
        try {
          const parsed = JSON.parse(text) as Partial<ThemeStudioState>;
          this.state.update((current) => mergeState(current, parsed));
          this.importError.set(null);
        } catch {
          this.importError.set('Could not read that file - it does not look like a valid theme JSON export.');
        }
      })
      .catch(() => {
        this.importError.set('Could not read that file.');
      })
      .finally(() => {
        input.value = '';
      });
  }

  private readSavedPresets(): SavedThemePreset[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private persistSavedPresets(presets: SavedThemePreset[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
    } catch {
      // Private browsing / storage quota - saved list still works for this session via the signal.
    }
  }
}
