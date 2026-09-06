import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pattern-dashboard-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './pattern-dashboard-demo.html',
  styleUrls: ['./pattern-dashboard-demo.scss'],
})
export class PatternDashboardDemo {
  commonService = inject(CommonService);

  features = [
    { name: 'KPI Cards', description: 'Key metrics display' },
    { name: 'Charts & Graphs', description: 'Data visualization' },
    { name: 'Real-time Updates', description: 'Live data refresh' },
    { name: 'Customizable Layout', description: 'Widget positioning' },
    { name: 'Drill-down Details', description: 'Data exploration' },
    { name: 'Export Reports', description: 'Generate reports' },
  ];

  useCases = [
    { title: 'Sales Dashboard', description: 'Revenue and sales metrics' },
    { title: 'Analytics Dashboard', description: 'Traffic and behavior' },
    { title: 'Admin Dashboard', description: 'System overview' },
    { title: 'Finance Dashboard', description: 'Budget and expenses' },
    { title: 'Performance Dashboard', description: 'Team metrics' },
    { title: 'Status Dashboard', description: 'System health' },
  ];

  dashboardComponents = [
    { component: 'Header', purpose: 'Title, date range, filters' },
    { component: 'KPI Cards', purpose: 'Key metrics at a glance' },
    { component: 'Charts', purpose: 'Trends and comparisons' },
    { component: 'Data Tables', purpose: 'Detailed records' },
    { component: 'Timeline', purpose: 'Activity stream' },
    { component: 'Sidebar', purpose: 'Navigation and filters' },
  ];
}
