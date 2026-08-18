import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-about-demo',
  imports: [DemoSection],
  templateUrl: './blocks-about-demo.html',
})
export class BlocksAboutDemo {
  public commonService = inject(CommonService);
  code = `<div class="hero-split">
    <div>
        <span class="eyebrow">Our Story</span>
        <h2>Built by developers who were tired of fighting their UI library</h2>
        <p>
            ${this.commonService.appName} started as an internal toolkit for teams who wanted full control over
            markup and styling without inheriting a CDK dependency tree they didn't ask for.
        </p>
    </div>
    <div class="hero-media">
        <!-- image / illustration -->
    </div>
</div>`;
}
