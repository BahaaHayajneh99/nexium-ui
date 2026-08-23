import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-headers-demo',
  imports: [NxButton, DemoSection],
  templateUrl: './blocks-headers-demo.html',
})
export class BlocksHeadersDemo {
  public commonService = inject(CommonService);
  simpleCode = `<header class="site-header">
    <span class="logo">${this.commonService.appName}</span>
    <nav>
        <a href="/product">Product</a>
        <a href="/docs">Docs</a>
        <a href="/pricing">Pricing</a>
        <a href="/blog">Blog</a>
    </nav>
</header>`;

  ctaCode = `<header class="site-header">
    <span class="logo">${this.commonService.appName}</span>
    <nav>
        <a href="/product">Product</a>
        <a href="/docs">Docs</a>
        <a href="/pricing">Pricing</a>
    </nav>
    <nx-button variant="primary" size="small">Sign Up Free</nx-button>
</header>`;
}
