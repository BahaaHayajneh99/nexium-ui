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
  // Audited against projects/components/src/public-api.ts - almost everything that used to be
  // listed under "Planned"/"In Progress" here had already shipped (e.g. Query Builder, Kanban,
  // App Shell, Code Block, Version Badge...) and the roadmap was just never updated to reflect it.
  groups: RoadmapGroup[] = [
    {
      heading: 'Shipped',
      items: [
        { title: 'Forms, Data Display, Feedback, Panels, Navigation, Uploads and Media component sets', status: 'shipped' },
        { title: 'Light/dark theming via CSS custom properties', status: 'shipped' },
        { title: 'Docs site with copyable HTML/TS snippets for every component', status: 'shipped' },
        { title: 'Layout primitives - Grid, Container, Flex, Stack, Divider, Spacer, Splitter, Aspect Ratio, Masonry', status: 'shipped' },
        { title: '7 full website templates (e-commerce, SaaS, real estate, restaurant, portfolio, hotel, course) plus a marketing blocks gallery', status: 'shipped' },
        { title: 'Advanced interaction - Drag & Drop, Kanban, Virtual Scroll/Grid, Resizable Panels, Sortable List, Column Selector, Filter Builder, Query Builder', status: 'shipped' },
        { title: 'Navigation & layout shells - App Shell, Navigation Rail, Page Header/Actions, Back Button, Nav Group, Command Bar, Navigation Progress', status: 'shipped' },
        { title: 'Developer & content display - JSON Editor/Viewer, Diff Viewer, Before/After Comparison, Code Block, Copyable Text, Keyboard Shortcut Display', status: 'shipped' },
        { title: 'App meta & activity - Version Badge, Changelog Widget, Feature Flag, Permission Gate, Activity Timeline/Feed, Audit Timeline', status: 'shipped' },
        { title: 'Address Input, Filter Chip Group, Color Contrast Checker', status: 'shipped' },
        { title: 'Enterprise/PRO - Dashboard Builder, File Manager, Spreadsheet, PDF Viewer & Annotator, Image Editor', status: 'shipped' },
      ],
    },
    {
      heading: 'Planned',
      items: [
        { title: `Publishing the component libraries to npm under @${this.commonService.appName.toLowerCase()}/*`, status: 'planned' },
        { title: 'CLI for scaffolding new components against the shared token system', status: 'planned' },
        { title: 'Diagram Editor', status: 'planned' },
      ],
    },
  ];
}
