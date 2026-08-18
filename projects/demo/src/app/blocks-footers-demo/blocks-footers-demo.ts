import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

interface FooterColumn {
  title: string;
  links: string[];
}

@Component({
  selector: 'app-blocks-footers-demo',
  imports: [DemoSection],
  templateUrl: './blocks-footers-demo.html',
})
export class BlocksFootersDemo {
  public commonService = inject(CommonService);
  columns: FooterColumn[] = [
    { title: 'Product', links: ['Components', 'Templates', 'Blocks', 'Changelog'] },
    { title: 'Resources', links: ['Guide', 'Playground', 'Icons', 'Utilities'] },
    { title: 'Company', links: ['About', 'Roadmap', 'Contributing'] },
  ];

  previewCode = `<footer class="site-footer">
    <div class="footer-grid">
        <div>
            <span class="logo">${this.commonService.appName}</span>
            <p>Standalone Angular components with no external UI or CDK dependency.</p>
        </div>

        <div>
            <div class="footer-col-title">Product</div>
            <a href="#">Components</a>
            <a href="#">Templates</a>
            <a href="#">Blocks</a>
        </div>

        <div>
            <div class="footer-col-title">Resources</div>
            <a href="#">Guide</a>
            <a href="#">Playground</a>
        </div>

        <div>
            <div class="footer-col-title">Company</div>
            <a href="#">About</a>
            <a href="#">Roadmap</a>
        </div>
    </div>

    <div class="footer-bottom">&copy; 2026 ${this.commonService.appName}. All rights reserved.</div>
</footer>`;
}
