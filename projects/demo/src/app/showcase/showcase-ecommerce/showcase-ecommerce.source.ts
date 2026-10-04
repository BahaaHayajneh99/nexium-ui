export const ECOMMERCE_TS_SOURCE = `import { Component, computed, signal } from '@angular/core';
import { NxNavbar, NxButton, NxIcon, NxBadge, NxRating, NxDrawer, NxFab } from 'nexium-ui';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  icon: string;
}

@Component({
  selector: 'app-storefront',
  standalone: true,
  imports: [NxNavbar, NxButton, NxIcon, NxBadge, NxRating, NxDrawer, NxFab],
  templateUrl: './storefront.html',
})
export class Storefront {
  categories = ['All', 'Living', 'Kitchen', 'Lighting', 'Textiles'];
  activeCategory = signal('All');

  products: Product[] = [
    { id: 1, name: 'Oakridge Lounge Chair', category: 'Living', price: 349, rating: 4.5, icon: 'nx-home' },
    // ...more products
  ];

  filteredProducts = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All' ? this.products : this.products.filter((p) => p.category === cat);
  });

  cart = signal<{ product: Product; qty: number }[]>([]);
  cartOpen = signal(false);

  cartCount = computed(() => this.cart().reduce((sum, line) => sum + line.qty, 0));
  cartTotal = computed(() => this.cart().reduce((sum, line) => sum + line.qty * line.product.price, 0));

  orderPlaced = signal(false);

  addToCart(product: Product): void {
    this.cart.update((lines) => {
      const existing = lines.find((l) => l.product.id === product.id);
      if (existing) return lines.map((l) => (l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l));
      return [...lines, { product, qty: 1 }];
    });
    this.cartOpen.set(true);
  }

  checkout(): void {
    this.cart.set([]);
    this.orderPlaced.set(true);
    setTimeout(() => this.cartOpen.set(false), 1800);
  }
}
`;

export const ECOMMERCE_HTML_SOURCE = `<nx-navbar [sticky]="true">
    <div nx-navbar-brand>Fernway</div>
    <div nx-navbar-actions>
        <button (click)="cartOpen.set(true)">
            <nx-icon icon="nx-shopping-cart" variant="svg"></nx-icon>
            Cart @if (cartCount() > 0) { <span>{{ cartCount() }}</span> }
        </button>
    </div>
</nx-navbar>

<div class="categories">
    @for (cat of categories; track cat) {
        <button [class.active]="activeCategory() === cat" (click)="activeCategory.set(cat)">{{ cat }}</button>
    }
</div>

<div class="product-grid">
    @for (product of filteredProducts(); track product.id) {
        <div class="product-card">
            <nx-icon [icon]="product.icon" variant="svg"></nx-icon>
            <div>{{ product.name }}</div>
            <nx-rating [value]="product.rating" [readonly]="true"></nx-rating>
            <span>\${{ product.price }}</span>
            <nx-button variant="primary" size="small" (click)="addToCart(product)">Add to cart</nx-button>
        </div>
    }
</div>

<nx-fab icon="nx-shopping-cart" position="bottom-right" (clicked)="cartOpen.set(true)"></nx-fab>

<nx-drawer [open]="cartOpen()" (openChange)="cartOpen.set($event)" side="right">
    @if (orderPlaced()) {
        <p>Order placed! Thanks for shopping with Fernway.</p>
    } @else {
        @for (line of cart(); track line.product.id) {
            <div>{{ line.product.name }} × {{ line.qty }}</div>
        }
        <div>Total: \${{ cartTotal() }}</div>
        <nx-button variant="primary" [fullWidth]="true" (click)="checkout()">Checkout</nx-button>
    }
</nx-drawer>
`;
