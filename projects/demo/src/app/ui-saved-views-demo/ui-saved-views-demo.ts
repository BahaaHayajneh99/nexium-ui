import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NxSavedView, NxSavedViews } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

interface TableFilterState {
  search: string;
  sortBy: string;
  status: string;
}

@Component({
  selector: 'app-ui-saved-views-demo',
  imports: [NxSavedViews, JsonPipe, DemoSection],
  templateUrl: './ui-saved-views-demo.html',
  styleUrl: './ui-saved-views-demo.scss',
})
export class UiSavedViewsDemo {
  importCode = `import { NxSavedViews } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  views: NxSavedView<TableFilterState>[] = [
    { id: 'v1', name: 'My open tasks', state: { search: '', sortBy: 'dueDate', status: 'open' }, isDefault: true },
    { id: 'v2', name: 'This week', state: { search: '', sortBy: 'dueDate', status: 'any' } },
    { id: 'v3', name: 'High priority', state: { search: 'priority:high', sortBy: 'priority', status: 'any' } },
  ];

  activeViewId: string | null = 'v1';

  currentState: TableFilterState = { search: '', sortBy: 'dueDate', status: 'open' };

  lastAction = '';

  basicCode = `<nx-saved-views
  [views]="views"
  [activeViewId]="activeViewId"
  [currentState]="currentState"
  (viewSelected)="onViewSelected($event)"
  (viewSaved)="onViewSaved($event)"
  (viewDeleted)="onViewDeleted($event)"
  (viewRenamed)="onViewRenamed($event)">
</nx-saved-views>`;

  basicTs = `views: NxSavedView[] = [
  { id: 'v1', name: 'My open tasks', state: { status: 'open' }, isDefault: true },
  { id: 'v2', name: 'This week', state: { status: 'any' } },
];
activeViewId: string | null = 'v1';
currentState = { search: '', sortBy: 'dueDate', status: 'open' }; // whatever your own table tracks

onViewSelected(view: NxSavedView): void {
  this.activeViewId = view.id;
  this.currentState = view.state; // apply view.state to your own table/filters
}

onViewSaved({ name, state }: { name: string; state: unknown }): void {
  // id-generation is the consumer's concern, not NxSavedViews'
  const view: NxSavedView = { id: Date.now().toString(), name, state };
  this.views = [...this.views, view];
  this.activeViewId = view.id;
}

onViewDeleted(id: string): void {
  this.views = this.views.filter((v) => v.id !== id);
  if (this.activeViewId === id) {
    this.activeViewId = null;
  }
}

onViewRenamed({ id, name }: { id: string; name: string }): void {
  this.views = this.views.map((v) => (v.id === id ? { ...v, name } : v));
}`;

  onViewSelected(view: NxSavedView<TableFilterState>): void {
    this.activeViewId = view.id;
    this.currentState = view.state;
    this.lastAction = `Applied view "${view.name}"`;
  }

  onViewSaved(event: { name: string; state: TableFilterState | null }): void {
    const view: NxSavedView<TableFilterState> = {
      id: Date.now().toString(),
      name: event.name,
      state: event.state ?? this.currentState,
    };
    this.views = [...this.views, view];
    this.activeViewId = view.id;
    this.lastAction = `Saved new view "${view.name}"`;
  }

  onViewDeleted(id: string): void {
    const deleted = this.views.find((view) => view.id === id);
    this.views = this.views.filter((view) => view.id !== id);
    if (this.activeViewId === id) {
      this.activeViewId = null;
    }
    this.lastAction = deleted ? `Deleted view "${deleted.name}"` : this.lastAction;
  }

  onViewRenamed(event: { id: string; name: string }): void {
    this.views = this.views.map((view) => (view.id === event.id ? { ...view, name: event.name } : view));
    this.lastAction = `Renamed view to "${event.name}"`;
  }
}
