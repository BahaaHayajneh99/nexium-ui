import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

interface RoadmapItem {
  title: string;
  status: 'shipped' | 'in-progress' | 'planned';
}

interface RoadmapGroup {
  heading: string;
  items: RoadmapItem[];
}

@Component({
  selector: 'app-about-roadmap-demo',
  templateUrl: './about-roadmap-demo.html',
  styleUrl: './about-roadmap-demo.scss',
})
export class AboutRoadmapDemo {
  public commonService = inject(CommonService);
  groups: RoadmapGroup[] = [
    {
      heading: 'Shipped',
      items: [
        { title: 'Forms, Data Display, Feedback, Panels, Navigation, Uploads and Media component sets', status: 'shipped' },
        { title: 'Light/dark theming via CSS custom properties', status: 'shipped' },
        { title: 'Docs site with copyable HTML/TS snippets for every component', status: 'shipped' },
      ],
    },
    {
      heading: 'In Progress',
      items: [
        { title: 'Layout primitives - Grid, Container, Divider, Spacer', status: 'in-progress' },
        { title: 'Page templates and marketing blocks gallery', status: 'in-progress' },
      ],
    },
    {
      heading: 'Planned',
      items: [
        { title: `Publishing the component libraries to npm under @${this.commonService.appName.toLowerCase()}/*`, status: 'planned' },
        { title: 'CDK-free drag-and-drop utilities', status: 'planned' },
        { title: 'CLI for scaffolding new components against the shared token system', status: 'planned' },
      ],
    },
  ];
}
