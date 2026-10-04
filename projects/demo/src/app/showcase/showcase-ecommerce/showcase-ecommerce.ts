import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxNavbar, NxButton, NxIcon, NxBadge, NxRating, NxDrawer, NxAvatar, NxFab } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { ECOMMERCE_TS_SOURCE, ECOMMERCE_HTML_SOURCE } from './showcase-ecommerce.source';

interface NxShowcaseProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  icon: string;
  swatch: string;
  badge?: 'Sale' | 'New';
}

interface NxCartLine {
  product: NxShowcaseProduct;
  qty: number;
}

@Component({
  selector: 'app-showcase-ecommerce',
  standalone: true,
  imports: [RouterLink, NxNavbar, NxButton, NxIcon, NxBadge, NxRating, NxDrawer, NxAvatar, NxFab, ShowcaseSourceView],
  templateUrl: './showcase-ecommerce.html',
  styleUrl: './showcase-ecommerce.scss',
})
export class ShowcaseEcommerce {
  tsSource = ECOMMERCE_TS_SOURCE;
  htmlSource = ECOMMERCE_HTML_SOURCE;

  categories = ['All', 'Living', 'Kitchen', 'Lighting', 'Textiles'];
  activeCategory = signal('All');

  products: NxShowcaseProduct[] = [
    { id: 1, name: 'Oakridge Lounge Chair', category: 'Living', price: 349, rating: 4.5, icon: 'nx-home', swatch: '#b08968' },
    { id: 2, name: 'Marlow Ceramic Vase', category: 'Living', price: 42, rating: 4, icon: 'nx-gift', swatch: '#7a9e7e' },
    { id: 3, name: 'Copperline Kettle', category: 'Kitchen', price: 68, rating: 5, icon: 'nx-fire', swatch: '#c97d4f' },
    { id: 4, name: 'Driftwood Cutting Board', category: 'Kitchen', price: 29, rating: 4, icon: 'nx-tag', swatch: '#8d6748', badge: 'New' },
    { id: 5, name: 'Halo Pendant Light', category: 'Lighting', price: 129, rating: 4.5, icon: 'nx-sun', swatch: '#e0a458', badge: 'Sale' },
    { id: 6, name: 'Lumen Table Lamp', category: 'Lighting', price: 74, rating: 4, icon: 'nx-sun', swatch: '#d98e5f' },
    { id: 7, name: 'Woven Throw Blanket', category: 'Textiles', price: 58, rating: 5, icon: 'nx-heart', swatch: '#a4756b' },
    { id: 8, name: 'Linen Cushion Cover', category: 'Textiles', price: 24, rating: 4, icon: 'nx-heart', swatch: '#c4a389', badge: 'Sale' },
  ];

  filteredProducts = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All' ? this.products : this.products.filter((p) => p.category === cat);
  });

  cart = signal<NxCartLine[]>([]);
  cartOpen = signal(false);
  orderPlaced = signal(false);

  cartCount = computed(() => this.cart().reduce((sum, line) => sum + line.qty, 0));
  cartTotal = computed(() => this.cart().reduce((sum, line) => sum + line.qty * line.product.price, 0));

  addToCart(product: NxShowcaseProduct): void {
    this.cart.update((lines) => {
      const existing = lines.find((l) => l.product.id === product.id);
      if (existing) {
        return lines.map((l) => (l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...lines, { product, qty: 1 }];
    });
    this.cartOpen.set(true);
  }

  removeLine(productId: number): void {
    this.cart.update((lines) => lines.filter((l) => l.product.id !== productId));
  }

  checkout(): void {
    this.cart.set([]);
    this.orderPlaced.set(true);
    setTimeout(() => {
      this.orderPlaced.set(false);
      this.cartOpen.set(false);
    }, 1800);
  }
}
