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
    {
      heading: 'Planned - Advanced Interaction',
      items: [
        { title: 'Drag & Drop', status: 'planned' },
        { title: 'Kanban', status: 'planned' },
        { title: 'Split View', status: 'planned' },
        { title: 'Virtual Scroll', status: 'planned' },
        { title: 'Infinite Scroll', status: 'planned' },
        { title: 'Resizable Panels', status: 'planned' },
        { title: 'Sortable List', status: 'planned' },
        { title: 'Column Selector', status: 'planned' },
        { title: 'Filter Builder', status: 'planned' },
        { title: 'Query Builder', status: 'planned' },
      ],
    },
    {
      heading: 'Planned - Navigation & Layout',
      items: [
        { title: 'Navigation Rail', status: 'planned' },
        { title: 'App Shell', status: 'planned' },
        { title: 'Page Header', status: 'planned' },
        { title: 'Page Actions', status: 'planned' },
        { title: 'Back Button', status: 'planned' },
        { title: 'Nav Group', status: 'planned' },
        { title: 'Command Bar', status: 'planned' },
        { title: 'Navigation Progress', status: 'planned' },
      ],
    },
    {
      heading: 'Planned - Developer & Content Display',
      items: [
        { title: 'JSON Editor', status: 'planned' },
        { title: 'JSON Viewer', status: 'planned' },
        { title: 'Diff Viewer', status: 'planned' },
        { title: 'Before/After Comparison', status: 'planned' },
        { title: 'Code Block', status: 'planned' },
        { title: 'Copyable Text', status: 'planned' },
        { title: 'Keyboard Shortcut Display', status: 'planned' },
      ],
    },
    {
      heading: 'Planned - App Meta & Activity',
      items: [
        { title: 'Version Badge', status: 'planned' },
        { title: 'Changelog Widget', status: 'planned' },
        { title: 'Feature Flag', status: 'planned' },
        { title: 'Permission Gate', status: 'planned' },
        { title: 'Activity Timeline', status: 'planned' },
        { title: 'Activity Feed', status: 'planned' },
        { title: 'Audit Timeline', status: 'planned' },
      ],
    },
    {
      heading: 'Planned - Misc',
      items: [
        { title: 'Address Input', status: 'planned' },
        { title: 'Filter Chip Group', status: 'planned' },
        { title: 'Color Contrast Checker', status: 'planned' },
      ],
    },
    {
      heading: 'Planned - Enterprise / Pro',
      items: [
        { title: 'Diagram Editor', status: 'planned' },
        { title: 'Spreadsheet', status: 'planned' },
        { title: 'File Manager Pro', status: 'planned' },
        { title: 'PDF Viewer', status: 'planned' },
        { title: 'Image Editor', status: 'planned' },
        { title: 'Dashboard Builder', status: 'planned' },
      ],
    },
  ];
}
