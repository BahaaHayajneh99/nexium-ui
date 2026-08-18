import { Component } from '@angular/core';
import { UiTable, NxTableColumn, UiGaugeChart, NxGaugeBand, UiHeatmapChart } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-risk-management-demo',
  imports: [UiTable, UiGaugeChart, UiHeatmapChart, DemoSection],
  templateUrl: './templates-risk-management-demo.html',
})
export class TemplatesRiskManagementDemo {
  riskBands: NxGaugeBand[] = [
    { to: 40, variant: 'success', label: 'Low' },
    { to: 70, variant: 'warning', label: 'Moderate' },
    { to: 100, variant: 'danger', label: 'High' },
  ];

  impactLevels = ['Low', 'Medium', 'High', 'Critical'];
  likelihoodLevels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Certain'];

  riskMatrix: number[][] = [
    [1, 2, 3, 4],
    [2, 4, 6, 8],
    [3, 6, 9, 12],
    [4, 8, 12, 16],
    [5, 10, 15, 20],
  ];

  columns: NxTableColumn[] = [
    { field: 'risk', header: 'Risk' },
    { field: 'owner', header: 'Owner' },
    { field: 'likelihood', header: 'Likelihood' },
    { field: 'impact', header: 'Impact' },
  ];

  register: Record<string, unknown>[] = [
    { risk: 'Vendor data breach', owner: 'Ada Lovelace', likelihood: 'Unlikely', impact: 'Critical' },
    { risk: 'Key engineer attrition', owner: 'Grace Hopper', likelihood: 'Possible', impact: 'High' },
    { risk: 'Cloud provider outage', owner: 'Alan Turing', likelihood: 'Rare', impact: 'High' },
    { risk: 'Regulatory change', owner: 'Margaret Hamilton', likelihood: 'Likely', impact: 'Medium' },
  ];

  gaugeCode = `<nx-gauge-chart [value]="58" [min]="0" [max]="100" [bands]="riskBands" label="Overall Risk Score"></nx-gauge-chart>`;

  matrixCode = `<nx-heatmap-chart [rows]="likelihoodLevels" [columns]="impactLevels" [data]="riskMatrix"></nx-heatmap-chart>`;

  registerCode = `<nx-table [columns]="columns" [data]="register" striped hoverable></nx-table>`;
}
