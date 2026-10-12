import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import {
  NxComparisonTable,
  NxComparisonTableColumn,
  NxComparisonTableSection,
  NxComparisonTableRow,
} from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-comparison-table-demo',
  imports: [NxComparisonTable, DemoSection],
  templateUrl: './ui-comparison-table-demo.html',
  styleUrl: './ui-comparison-table-demo.scss',
})
export class UiComparisonTableDemo {
  public commonService = inject(CommonService);

  importCode = `import { NxComparisonTable } from 'nexium-ui';`;

  // ---------- Basic: flat row list, no sections ----------

  flatColumns: NxComparisonTableColumn[] = [
    { name: 'Free' },
    { name: 'Pro', description: '$29/mo', badge: 'Most popular', highlighted: true },
    { name: 'Enterprise', description: 'Contact us' },
  ];

  flatRows: NxComparisonTableRow[] = [
    { label: 'Team members', cells: [{ type: 'text', value: '1' }, { type: 'text', value: '10' }, { type: 'text', value: 'Unlimited', emphasis: true }] },
    { label: 'Projects', cells: [{ type: 'text', value: '3' }, { type: 'text', value: '25' }, { type: 'text', value: 'Unlimited', emphasis: true }] },
    { label: 'Priority support', cells: [{ type: 'boolean', value: false }, { type: 'boolean', value: true }, { type: 'boolean', value: true }] },
  ];

  basicCode = `<nx-comparison-table [columns]="columns" [rows]="rows"></nx-comparison-table>`;

  basicTs = `columns: NxComparisonTableColumn[] = [
  { name: 'Free' },
  { name: 'Pro', description: '$29/mo', badge: 'Most popular', highlighted: true },
  { name: 'Enterprise', description: 'Contact us' },
];

rows: NxComparisonTableRow[] = [
  {
    label: 'Team members',
    cells: [
      { type: 'text', value: '1' },
      { type: 'text', value: '10' },
      { type: 'text', value: 'Unlimited', emphasis: true },
    ],
  },
  {
    label: 'Projects',
    cells: [
      { type: 'text', value: '3' },
      { type: 'text', value: '25' },
      { type: 'text', value: 'Unlimited', emphasis: true },
    ],
  },
  {
    label: 'Priority support',
    cells: [
      { type: 'boolean', value: false },
      { type: 'boolean', value: true },
      { type: 'boolean', value: true },
    ],
  },
];`;

  // ---------- Full pricing comparison: grouped sections ----------

  pricingColumns: NxComparisonTableColumn[] = [
    { name: 'Free', description: '$0/mo' },
    { name: 'Pro', description: '$29/mo', badge: 'Most popular', highlighted: true },
    { name: 'Enterprise', description: 'Contact us' },
  ];

  pricingSections: NxComparisonTableSection[] = [
    {
      title: 'Core',
      rows: [
        {
          label: 'Components',
          tooltip: 'Access to the full NexiumUI component library.',
          cells: [
            { type: 'boolean', value: true },
            { type: 'boolean', value: true },
            { type: 'boolean', value: true },
          ],
        },
        {
          label: 'Team members',
          cells: [
            { type: 'text', value: '1' },
            { type: 'text', value: '10' },
            { type: 'text', value: 'Unlimited', emphasis: true },
          ],
        },
        {
          label: 'Storage',
          cells: [
            { type: 'text', value: '1 GB' },
            { type: 'text', value: '50 GB' },
            { type: 'text', value: '500 GB' },
          ],
        },
      ],
    },
    {
      title: 'AI',
      rows: [
        {
          label: 'AI Assistant',
          tooltip: 'Inline AI suggestions while building components.',
          cells: [
            { type: 'boolean', value: false },
            { type: 'boolean', value: true },
            { type: 'boolean', value: true },
          ],
        },
        {
          label: 'AI Code Review',
          cells: [
            { type: 'boolean', value: false },
            { type: 'boolean', value: false },
            { type: 'boolean', value: true },
          ],
        },
      ],
    },
    {
      title: 'Analytics',
      rows: [
        {
          label: 'Usage analytics',
          cells: [
            { type: 'boolean', value: false },
            { type: 'boolean', value: true },
            { type: 'boolean', value: true },
          ],
        },
        {
          label: 'Custom reports',
          cells: [
            { type: 'boolean', value: false },
            { type: 'boolean', value: false },
            { type: 'boolean', value: true },
          ],
        },
      ],
    },
    {
      title: 'Security',
      rows: [
        {
          label: 'SSO',
          tooltip: 'Single sign-on via SAML or OIDC.',
          cells: [
            { type: 'boolean', value: false },
            { type: 'boolean', value: false },
            { type: 'boolean', value: true },
          ],
        },
        {
          label: 'Audit logs',
          cells: [
            { type: 'boolean', value: false },
            { type: 'boolean', value: true },
            { type: 'boolean', value: true },
          ],
        },
        {
          label: 'Support',
          cells: [
            { type: 'text', value: 'Community' },
            { type: 'text', value: 'Email' },
            { type: 'text', value: '24/7 phone & email', emphasis: true },
          ],
        },
      ],
    },
  ];

  pricingCode = `<nx-comparison-table [columns]="pricingColumns" [sections]="pricingSections"></nx-comparison-table>`;

  pricingTs = `pricingColumns: NxComparisonTableColumn[] = [
  { name: 'Free', description: '$0/mo' },
  { name: 'Pro', description: '$29/mo', badge: 'Most popular', highlighted: true },
  { name: 'Enterprise', description: 'Contact us' },
];

pricingSections: NxComparisonTableSection[] = [
  {
    title: 'Core',
    rows: [
      {
        label: 'Components',
        tooltip: 'Access to the full NexiumUI component library.',
        cells: [
          { type: 'boolean', value: true },
          { type: 'boolean', value: true },
          { type: 'boolean', value: true },
        ],
      },
      // ...Team members, Storage
    ],
  },
  {
    title: 'AI',
    rows: [
      {
        label: 'AI Assistant',
        tooltip: 'Inline AI suggestions while building components.',
        cells: [
          { type: 'boolean', value: false },
          { type: 'boolean', value: true },
          { type: 'boolean', value: true },
        ],
      },
      // ...AI Code Review
    ],
  },
  {
    title: 'Security',
    rows: [
      {
        label: 'SSO',
        tooltip: 'Single sign-on via SAML or OIDC.',
        cells: [
          { type: 'boolean', value: false },
          { type: 'boolean', value: false },
          { type: 'boolean', value: true },
        ],
      },
      // ...Audit logs, Support
    ],
  },
];`;

  // ---------- Missing-feature style: dash vs cross ----------

  missingStyleCode = `<nx-comparison-table [columns]="flatColumns" [rows]="flatRows" missingStyle="dash"></nx-comparison-table>
<nx-comparison-table [columns]="flatColumns" [rows]="flatRows" missingStyle="cross"></nx-comparison-table>`;
}
