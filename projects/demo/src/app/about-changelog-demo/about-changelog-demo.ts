import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { RELEASE_NOTES } from '../data/release-notes';

@Component({
  selector: 'app-about-changelog-demo',
  templateUrl: './about-changelog-demo.html',
  styles: `
    .changelog-tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .02em;
      padding: 2px 6px;
      border-radius: 4px;
      margin-right: 6px;
      vertical-align: middle;
    }
    .changelog-tag.feature { background: rgba(52, 152, 219, .15); color: #3498db; }
    .changelog-tag.improvement { background: rgba(46, 204, 113, .15); color: #2ecc71; }
    .changelog-tag.fix { background: rgba(231, 76, 60, .15); color: #e74c3c; }
  `,
})
export class AboutChangelogDemo {
  public commonService = inject(CommonService);
  entries = RELEASE_NOTES;
}
