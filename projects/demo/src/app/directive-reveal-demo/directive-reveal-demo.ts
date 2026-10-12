import { Component } from '@angular/core';
import { NxReveal, NxRevealAnimation } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface RevealCard {
  title: string;
  description: string;
  animation: NxRevealAnimation;
}

@Component({
  selector: 'app-directive-reveal-demo',
  imports: [NxReveal, DemoSection],
  templateUrl: './directive-reveal-demo.html',
  styleUrl: './directive-reveal-demo.scss',
})
export class DirectiveRevealDemo {
  importCode = `import { NxReveal } from 'nexium-ui';`;

  basicCode = `<div nxReveal>Fades in once, the first time it enters the viewport.</div>`;

  animationCode = `<div nxReveal nxRevealAnimation="fade">...</div>
<div nxReveal nxRevealAnimation="slide-up">...</div>
<div nxReveal nxRevealAnimation="slide-down">...</div>
<div nxReveal nxRevealAnimation="slide-left">...</div>
<div nxReveal nxRevealAnimation="slide-right">...</div>
<div nxReveal nxRevealAnimation="zoom">...</div>`;

  repeatCode = `<!-- nxRevealOnce defaults to true - set it to false to replay every time the element re-enters the viewport -->
<div nxReveal [nxRevealOnce]="false" nxRevealAnimation="slide-up">
    Scroll me out of view, then back in - this one replays every time.
</div>`;

  cards: RevealCard[] = [
    { title: 'Fade', description: 'The default animation - a plain opacity transition, no movement.', animation: 'fade' },
    { title: 'Slide Up', description: 'Rises into place from slightly below its final position.', animation: 'slide-up' },
    { title: 'Slide Down', description: 'Drops into place from slightly above its final position.', animation: 'slide-down' },
    { title: 'Slide Left', description: 'Slides in from the right.', animation: 'slide-left' },
    { title: 'Slide Right', description: 'Slides in from the left.', animation: 'slide-right' },
    { title: 'Zoom', description: 'Scales up slightly into its final size while fading in.', animation: 'zoom' },
  ];
}
