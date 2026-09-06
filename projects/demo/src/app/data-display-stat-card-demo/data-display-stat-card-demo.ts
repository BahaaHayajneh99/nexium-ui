import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { highlightTs } from '../shared/demo-section/ts-highlight';

interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}

@Component({
  selector: 'app-data-display-stat-card-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-display-stat-card-demo.html',
  styleUrls: ['./data-display-stat-card-demo.scss'],
})
export class DataDisplayStatCardDemo {
  commonService = inject(CommonService);

  stats: StatCard[] = [
    { title: 'Total Revenue', value: '$45,230', change: '+12.5%', trend: 'up', icon: '💰' },
    { title: 'Active Users', value: '12,543', change: '+8.2%', trend: 'up', icon: '👥' },
    { title: 'Conversion Rate', value: '3.8%', change: '-2.1%', trend: 'down', icon: '📊' },
    { title: 'Page Views', value: '234K', change: '+45%', trend: 'up', icon: '👁️' },
    { title: 'Orders', value: '1,259', change: '+5.3%', trend: 'up', icon: '📦' },
    { title: 'Support Tickets', value: '287', change: '+12%', trend: 'down', icon: '🎫' },
  ];

  basicCode = highlightTs(`
<nx-card class="stat-card">
  <h3>{{ stat.title }}</h3>
  <p class="value">{{ stat.value }}</p>
  <span [class]="'change ' + stat.trend">
    {{ stat.change }}
  </span>
</nx-card>
  `);

  features = [
    { name: 'Key Metrics', description: 'Display important statistics' },
    { name: 'Trend Indicators', description: 'Show up/down change' },
    { name: 'Multiple Layouts', description: 'Grid, list, or card view' },
    { name: 'Icon Support', description: 'Custom icons for metrics' },
    { name: 'Comparison', description: 'Period-over-period data' },
    { name: 'Responsive', description: 'Mobile-friendly layouts' },
  ];

  useCases = [
    { title: 'Dashboard', description: 'KPI and metric display' },
    { title: 'Analytics', description: 'Performance tracking' },
    { title: 'Admin Panel', description: 'System statistics' },
    { title: 'Reports', description: 'Key findings summary' },
    { title: 'E-commerce', description: 'Sales and traffic stats' },
    { title: 'Finance', description: 'Revenue and profit metrics' },
  ];
}
