import { Component, Input, OnInit, booleanAttribute, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';

/** A collapsible, labeled group of nav links - typically nested inside a sidebar. */
@Component({
  selector: 'nx-nav-group',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-nav-group.html',
  styleUrl: './ui-nav-group.scss',
})
export class NxNavGroup implements OnInit {
  @Input() label = '';
  @Input() icon = '';
  @Input({ transform: booleanAttribute }) defaultExpanded = true;

  expanded = signal(true);

  ngOnInit(): void {
    this.expanded.set(this.defaultExpanded);
  }

  toggle(): void {
    this.expanded.update((value) => !value);
  }
}
