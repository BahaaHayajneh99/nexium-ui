import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { RELEASE_NOTES, ReleaseNote } from '../data/release-notes';
import { NxSelect, NxSelectOption } from '../../../../../dist/components';

@Component({
  selector: 'app-about-releases-demo',
  standalone: true,
  imports: [FormsModule, NxSelect],
  templateUrl: './about-releases-demo.html',
  styles: `
    .release-version-picker {
      max-width: 320px;
      margin-bottom: 1.5rem;
    }
    .release-meta {
      display: flex;
      align-items: baseline;
      gap: .5rem;
      margin-bottom: 1rem;
    }
    .release-meta .latest-badge {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .02em;
      padding: 2px 8px;
      border-radius: 999px;
      background: var(--shell-primary);
      color: #fff;
    }
    .release-changes {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: .6rem;
    }
    .release-changes li {
      display: flex;
      align-items: flex-start;
      gap: .5rem;
    }
    .release-tag {
      flex-shrink: 0;
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .02em;
      padding: 2px 6px;
      border-radius: 4px;
      margin-top: 2px;
    }
    .release-tag.feature { background: rgba(52, 152, 219, .15); color: #3498db; }
    .release-tag.improvement { background: rgba(46, 204, 113, .15); color: #2ecc71; }
    .release-tag.fix { background: rgba(231, 76, 60, .15); color: #e74c3c; }
  `,
})
export class AboutReleasesDemo {
  public commonService = inject(CommonService);

  private readonly notes: ReleaseNote[] = RELEASE_NOTES;

  readonly versionOptions: NxSelectOption[] = this.notes.map((note, index) => ({
    label: index === 0 ? `${note.version} (Latest)` : note.version,
    value: note.version,
  }));

  selectedVersion = this.notes[0]?.version ?? '';

  get selectedEntry(): ReleaseNote | undefined {
    return this.notes.find((note) => note.version === this.selectedVersion);
  }

  get isLatest(): boolean {
    return this.selectedVersion === this.notes[0]?.version;
  }
}
