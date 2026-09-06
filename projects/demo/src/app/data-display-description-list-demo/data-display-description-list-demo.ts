import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { highlightTs } from '../shared/demo-section/ts-highlight';
import { DemoSection } from '../shared/demo-section/demo-section';

interface DescriptionItem {
  term: string;
  definition: string;
}

@Component({
  selector: 'app-data-display-description-list-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './data-display-description-list-demo.html',
  styleUrls: ['./data-display-description-list-demo.scss'],
})
export class DataDisplayDescriptionListDemo {
  commonService = inject(CommonService);

  productDetails: DescriptionItem[] = [
    { term: 'Product', definition: 'Premium Angular UI Component Library' },
    { term: 'Version', definition: '1.0.0' },
    { term: 'License', definition: 'MIT' },
    { term: 'Repository', definition: 'github.com/nexium/nexaui' },
    { term: 'Package', definition: '@nexium/ui' },
    { term: 'Published', definition: 'January 2024' },
  ];

  basicCode = highlightTs(`
<dl class="description-list">
  <dt>Term</dt>
  <dd>Definition</dd>
  
  <dt>Another Term</dt>
  <dd>Another Definition</dd>
</dl>
  `);

  features = [
    { name: 'Semantic HTML', description: 'Uses <dl>, <dt>, <dd> elements' },
    { name: 'Key-Value Pairs', description: 'Display structured data' },
    { name: 'Term Grouping', description: 'Group related definitions' },
    { name: 'Accessibility', description: 'Screen reader friendly' },
    { name: 'Flexible Layout', description: 'Multiple display options' },
    { name: 'Multiple Definitions', description: 'One term, many definitions' },
  ];

  useCases = [
    { title: 'Product Info', description: 'Display product details' },
    { title: 'FAQ', description: 'Questions and answers' },
    { title: 'Glossary', description: 'Terms and definitions' },
    { title: 'Specifications', description: 'Technical specifications' },
    { title: 'Metadata', description: 'Document information' },
    { title: 'Profile', description: 'User or company profile' },
  ];
}
