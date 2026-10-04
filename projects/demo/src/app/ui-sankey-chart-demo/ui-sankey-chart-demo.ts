import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSankeyChart, NxSankeyNode, NxSankeyLink } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-sankey-chart-demo',
  imports: [NxSankeyChart, DemoSection],
  templateUrl: './ui-sankey-chart-demo.html',
  styleUrl: './ui-sankey-chart-demo.scss',
})
export class UiSankeyChartDemo {
  importCode = `import { NxSankeyChart } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  nodes: NxSankeyNode[] = [
    { id: 'organic', label: 'Organic Search' },
    { id: 'paid', label: 'Paid Ads' },
    { id: 'social', label: 'Social' },
    { id: 'referral', label: 'Referral' },

    { id: 'home', label: 'Homepage' },
    { id: 'pricing', label: 'Pricing Page' },
    { id: 'blog', label: 'Blog Post' },

    { id: 'signup', label: 'Signed Up' },
    { id: 'bounced', label: 'Bounced' },
  ];

  links: NxSankeyLink[] = [
    { source: 'organic', target: 'home', value: 420 },
    { source: 'organic', target: 'blog', value: 260 },
    { source: 'paid', target: 'pricing', value: 300 },
    { source: 'paid', target: 'home', value: 90 },
    { source: 'social', target: 'blog', value: 180 },
    { source: 'social', target: 'home', value: 60 },
    { source: 'referral', target: 'pricing', value: 110 },

    { source: 'home', target: 'signup', value: 240 },
    { source: 'home', target: 'bounced', value: 330 },
    { source: 'pricing', target: 'signup', value: 320 },
    { source: 'pricing', target: 'bounced', value: 90 },
    { source: 'blog', target: 'signup', value: 95 },
    { source: 'blog', target: 'bounced', value: 345 },
  ];

  basicCode = `<nx-sankey-chart [nodes]="nodes" [links]="links"></nx-sankey-chart>`;

  basicTs = `nodes: NxSankeyNode[] = [
  { id: 'organic', label: 'Organic Search' },
  { id: 'paid', label: 'Paid Ads' },
  { id: 'home', label: 'Homepage' },
  { id: 'pricing', label: 'Pricing Page' },
  { id: 'signup', label: 'Signed Up' },
  { id: 'bounced', label: 'Bounced' },
  // ...
];

links: NxSankeyLink[] = [
  { source: 'organic', target: 'home', value: 420 },
  { source: 'paid', target: 'pricing', value: 300 },
  { source: 'home', target: 'signup', value: 240 },
  { source: 'home', target: 'bounced', value: 330 },
  // ...
];`;
}
