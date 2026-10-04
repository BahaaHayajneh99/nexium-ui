import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NX_FILTER_OPERATORS, NxFilterField, NxFilterOperator } from '../ui-filter-builder';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxQueryCombinator = 'and' | 'or';

export interface NxQueryRule {
  id: string;
  field: string;
  operator: NxFilterOperator;
  value: string;
}

export interface NxQueryGroup {
  id: string;
  combinator: NxQueryCombinator;
  rules: (NxQueryRule | NxQueryGroup)[];
}

export function nxIsQueryGroup(node: NxQueryRule | NxQueryGroup): node is NxQueryGroup {
  return 'combinator' in node;
}

function createId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** One nesting level of a query tree - renders its own rules/groups and recurses into child groups. */
@Component({
  selector: 'nx-query-builder-group',
  standalone: true,
  imports: [NxQueryBuilderGroup],
  templateUrl: './ui-query-builder-group.html',
  styleUrl: './ui-query-builder.scss',
})
export class NxQueryBuilderGroup {
  @Input({ required: true }) group!: NxQueryGroup;
  @Input() fields: NxFilterField[] = [];
  @Input() operators = NX_FILTER_OPERATORS;
  @Input() isRoot = false;

  @Output() groupChange = new EventEmitter<NxQueryGroup>();

  readonly isGroup = nxIsQueryGroup;

  setCombinator(combinator: NxQueryCombinator): void {
    this.groupChange.emit({ ...this.group, combinator });
  }

  addRule(): void {
    const rule: NxQueryRule = { id: createId(), field: this.fields[0]?.id ?? '', operator: 'equals', value: '' };
    this.groupChange.emit({ ...this.group, rules: [...this.group.rules, rule] });
  }

  addGroup(): void {
    const group: NxQueryGroup = { id: createId(), combinator: 'and', rules: [] };
    this.groupChange.emit({ ...this.group, rules: [...this.group.rules, group] });
  }

  updateNode(index: number, node: NxQueryRule | NxQueryGroup): void {
    const rules = [...this.group.rules];
    rules[index] = node;
    this.groupChange.emit({ ...this.group, rules });
  }

  removeNode(index: number): void {
    this.groupChange.emit({ ...this.group, rules: this.group.rules.filter((_, i) => i !== index) });
  }

  needsValue(operator: NxFilterOperator): boolean {
    return operator !== 'isEmpty' && operator !== 'isNotEmpty';
  }

  asRule(node: NxQueryRule | NxQueryGroup): NxQueryRule {
    return node as NxQueryRule;
  }

  asGroup(node: NxQueryRule | NxQueryGroup): NxQueryGroup {
    return node as NxQueryGroup;
  }
}

/** A nested AND/OR condition tree builder, for filters more complex than a flat list handles. */
@Component({
  selector: 'nx-query-builder',
  standalone: true,
  imports: [NxQueryBuilderGroup, NxProLocked],
  template: `
    @if (licensed()) {
      <nx-query-builder-group
        [group]="value"
        [fields]="fields"
        [operators]="operators"
        [isRoot]="true"
        (groupChange)="onChange($event)">
      </nx-query-builder-group>
    } @else {
      <nx-pro-locked componentName="Query Builder"></nx-pro-locked>
    }
  `,
})
export class NxQueryBuilder {
  protected readonly licensed = nxProLicenseGranted();

  @Input({ required: true }) value!: NxQueryGroup;
  @Input() fields: NxFilterField[] = [];
  @Input() operators = NX_FILTER_OPERATORS;

  @Output() valueChange = new EventEmitter<NxQueryGroup>();

  onChange(group: NxQueryGroup): void {
    this.value = group;
    this.valueChange.emit(group);
  }
}
