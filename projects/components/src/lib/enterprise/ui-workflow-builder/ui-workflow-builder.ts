import { Component, ElementRef, EventEmitter, Input, Output, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxWorkflowNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface NxWorkflowEdge {
  id: string;
  from: string;
  to: string;
}

const NODE_WIDTH = 160;
const NODE_HEIGHT = 56;

function createId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** A node-based flow canvas - drag nodes to reposition, drag from a node's right handle to another node to connect them. */
@Component({
  selector: 'nx-workflow-builder',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-workflow-builder.html',
  styleUrl: './ui-workflow-builder.scss',
})
export class NxWorkflowBuilder {
  protected readonly licensed = nxProLicenseGranted();

  @Input() nodes: NxWorkflowNode[] = [];
  @Input() edges: NxWorkflowEdge[] = [];

  @Output() nodesChange = new EventEmitter<NxWorkflowNode[]>();
  @Output() edgesChange = new EventEmitter<NxWorkflowEdge[]>();

  readonly nodeWidth = NODE_WIDTH;
  readonly nodeHeight = NODE_HEIGHT;

  /** Live end point of an in-progress connection drag, or null when not connecting. */
  connectingFrom = signal<string | null>(null);
  connectingToPoint = signal<{ x: number; y: number } | null>(null);

  private draggingNodeId: string | null = null;
  private dragStartClientX = 0;
  private dragStartClientY = 0;
  private dragStartNodeX = 0;
  private dragStartNodeY = 0;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  nodeById(id: string): NxWorkflowNode | undefined {
    return this.nodes.find((n) => n.id === id);
  }

  edgePath(edge: NxWorkflowEdge): string {
    const from = this.nodeById(edge.from);
    const to = this.nodeById(edge.to);
    if (!from || !to) {
      return '';
    }
    const x1 = from.x + NODE_WIDTH;
    const y1 = from.y + NODE_HEIGHT / 2;
    const x2 = to.x;
    const y2 = to.y + NODE_HEIGHT / 2;
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
  }

  get connectingPath(): string {
    const fromNode = this.connectingFrom();
    const point = this.connectingToPoint();
    if (!fromNode || !point) {
      return '';
    }
    const from = this.nodeById(fromNode);
    if (!from) {
      return '';
    }
    const x1 = from.x + NODE_WIDTH;
    const y1 = from.y + NODE_HEIGHT / 2;
    const midX = (x1 + point.x) / 2;
    return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${point.y}, ${point.x} ${point.y}`;
  }

  onNodePointerDown(node: NxWorkflowNode, event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.draggingNodeId = node.id;
    this.dragStartClientX = event.clientX;
    this.dragStartClientY = event.clientY;
    this.dragStartNodeX = node.x;
    this.dragStartNodeY = node.y;
    window.addEventListener('pointermove', this.onNodeDragMove);
    window.addEventListener('pointerup', this.onNodeDragEnd);
  }

  private onNodeDragMove = (event: PointerEvent): void => {
    if (!this.draggingNodeId) {
      return;
    }
    const node = this.nodeById(this.draggingNodeId);
    if (!node) {
      return;
    }
    node.x = this.dragStartNodeX + (event.clientX - this.dragStartClientX);
    node.y = this.dragStartNodeY + (event.clientY - this.dragStartClientY);
    this.nodes = [...this.nodes];
    this.nodesChange.emit(this.nodes);
  };

  private onNodeDragEnd = (): void => {
    this.draggingNodeId = null;
    window.removeEventListener('pointermove', this.onNodeDragMove);
    window.removeEventListener('pointerup', this.onNodeDragEnd);
  };

  onHandlePointerDown(node: NxWorkflowNode, event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.connectingFrom.set(node.id);
    this.connectingToPoint.set(this.pointerToCanvasPoint(event));
    window.addEventListener('pointermove', this.onConnectMove);
    window.addEventListener('pointerup', this.onConnectEnd);
  }

  private onConnectMove = (event: PointerEvent): void => {
    this.connectingToPoint.set(this.pointerToCanvasPoint(event));
  };

  private onConnectEnd = (event: PointerEvent): void => {
    window.removeEventListener('pointermove', this.onConnectMove);
    window.removeEventListener('pointerup', this.onConnectEnd);

    const fromId = this.connectingFrom();
    this.connectingFrom.set(null);
    this.connectingToPoint.set(null);
    if (!fromId) {
      return;
    }

    const point = this.pointerToCanvasPoint(event);
    const targetNode = this.nodes.find(
      (n) => point.x >= n.x && point.x <= n.x + NODE_WIDTH && point.y >= n.y && point.y <= n.y + NODE_HEIGHT,
    );
    if (targetNode && targetNode.id !== fromId) {
      const edge: NxWorkflowEdge = { id: createId(), from: fromId, to: targetNode.id };
      this.edges = [...this.edges, edge];
      this.edgesChange.emit(this.edges);
    }
  };

  private pointerToCanvasPoint(event: PointerEvent): { x: number; y: number } {
    const rect = this.elementRef.nativeElement.querySelector('.nx-workflow-builder-canvas')!.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
}
