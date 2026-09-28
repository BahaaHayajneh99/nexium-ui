import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxWorkflowBuilder, NxWorkflowEdge, NxWorkflowNode } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-workflow-builder-demo',
  imports: [NxWorkflowBuilder, DemoSection],
  templateUrl: './ui-workflow-builder-demo.html',
  styleUrl: './ui-workflow-builder-demo.scss',
})
export class UiWorkflowBuilderDemo {
  importCode = `import { NxWorkflowBuilder } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  nodes: NxWorkflowNode[] = [
    { id: 'trigger', label: 'New Order', x: 20, y: 40 },
    { id: 'check', label: 'Check Inventory', x: 260, y: 40 },
    { id: 'ship', label: 'Ship Order', x: 500, y: 0 },
    { id: 'backorder', label: 'Backorder', x: 500, y: 120 },
  ];

  edges: NxWorkflowEdge[] = [
    { id: 'e1', from: 'trigger', to: 'check' },
    { id: 'e2', from: 'check', to: 'ship' },
  ];

  basicCode = `<nx-workflow-builder
    [nodes]="nodes"
    [edges]="edges"
    (nodesChange)="onNodesChange($event)"
    (edgesChange)="onEdgesChange($event)">
</nx-workflow-builder>`;

  basicTs = `nodes: NxWorkflowNode[] = [
  { id: 'trigger', label: 'New Order', x: 20, y: 40 },
  { id: 'check', label: 'Check Inventory', x: 260, y: 40 },
  { id: 'ship', label: 'Ship Order', x: 500, y: 0 },
  { id: 'backorder', label: 'Backorder', x: 500, y: 120 },
];

edges: NxWorkflowEdge[] = [
  { id: 'e1', from: 'trigger', to: 'check' },
  { id: 'e2', from: 'check', to: 'ship' },
];

onNodesChange(next: NxWorkflowNode[]): void { this.nodes = next; }
onEdgesChange(next: NxWorkflowEdge[]): void { this.edges = next; }`;

  onNodesChange(next: NxWorkflowNode[]): void {
    this.nodes = next;
  }

  onEdgesChange(next: NxWorkflowEdge[]): void {
    this.edges = next;
  }
}
