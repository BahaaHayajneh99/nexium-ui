import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxCardFooter, NxBadge, NxTable, NxTableColumn, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface Product {
  name: string;
  price: string;
  stockLabel: string;
  stockVariant: 'success' | 'warning' | 'danger';
}

@Component({
  selector: 'app-templates-ecommerce-demo',
  imports: [NxCard, NxCardContent, NxCardFooter, NxBadge, NxButton, NxTable, DemoSection],
  templateUrl: './templates-ecommerce-demo.html',
})
export class TemplatesEcommerceDemo {
  products: Product[] = [
    { name: 'Wireless Headphones', price: '$79.00', stockLabel: 'In Stock', stockVariant: 'success' },
    { name: 'Mechanical Keyboard', price: '$129.00', stockLabel: 'Low Stock', stockVariant: 'warning' },
    { name: 'USB-C Hub', price: '$34.00', stockLabel: 'In Stock', stockVariant: 'success' },
  ];

  columns: NxTableColumn[] = [
    { field: 'order', header: 'Order' },
    { field: 'customer', header: 'Customer' },
    { field: 'total', header: 'Total' },
    { field: 'status', header: 'Status' },
  ];

  orders: Record<string, unknown>[] = [
    { order: '#1042', customer: 'Ada Lovelace', total: '$79.00', status: 'Shipped' },
    { order: '#1041', customer: 'Grace Hopper', total: '$163.00', status: 'Processing' },
    { order: '#1040', customer: 'Alan Turing', total: '$34.00', status: 'Delivered' },
  ];

  productCode = `<nx-card variant="outlined">
    <nx-card-content>
        <div class="block-hero-media">Image placeholder</div>
        <div>Wireless Headphones</div>
        <strong>$79.00</strong>
        <nx-badge variant="success" size="small">In Stock</nx-badge>
    </nx-card-content>
    <nx-card-footer>
        <nx-button variant="primary">Add to Cart</nx-button>
    </nx-card-footer>
</nx-card>`;

  ordersCode = `<nx-table [columns]="columns" [data]="orders" striped hoverable></nx-table>`;
}
