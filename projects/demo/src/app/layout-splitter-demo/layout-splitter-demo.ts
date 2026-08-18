import { Component } from '@angular/core';
import { UiSplitter } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-splitter-demo',
  imports: [UiSplitter, DemoSection],
  templateUrl: './layout-splitter-demo.html',
})
export class LayoutSplitterDemo {
  horizontalCode = `<nx-splitter>
    <div nx-splitter-start>Left pane</div>
    <div nx-splitter-end>Right pane</div>
</nx-splitter>`;

  verticalCode = `<nx-splitter orientation="vertical">
    <div nx-splitter-start>Top pane</div>
    <div nx-splitter-end>Bottom pane</div>
</nx-splitter>`;
}
