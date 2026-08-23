import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAvatar, NxCard, NxCardContent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-blocks-testimonials-demo',
  imports: [NxAvatar, NxCard, NxCardContent, DemoSection],
  templateUrl: './blocks-testimonials-demo.html',
})
export class BlocksTestimonialsDemo {
  public commonService = inject(CommonService);
  testimonials: Testimonial[] = [
    { quote: `We swapped our old component library for ${this.commonService.appName} in a weekend - no CDK version conflicts to fight anymore.`, name: 'Ada Lovelace', role: 'Frontend Lead, Analytical' },
    { quote: 'The token system meant our designer could hand us hex codes once and every component just picked them up.', name: 'Grace Hopper', role: 'Product Engineer, Compilers Inc.' },
    { quote: "RTL support that actually works out of the box saved us weeks on our Arabic launch.", name: 'Alan Turing', role: 'CTO, Enigma Labs' },
  ];

  previewCode = `<nx-card variant="outlined">
    <nx-card-content>
        <p class="quote">"We swapped our old component library for ${this.commonService.appName} in a weekend - no CDK version conflicts to fight anymore."</p>
        <div class="author">
            <nx-avatar name="Ada Lovelace" size="small"></nx-avatar>
            <div>
                <div class="author-name">Ada Lovelace</div>
                <div class="author-role">Frontend Lead, Analytical</div>
            </div>
        </div>
    </nx-card-content>
</nx-card>`;
}
