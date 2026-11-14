import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxCardFooter, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface MenuItem {
  category: string;
  name: string;
  description: string;
  price: number;
}

interface CartItem {
  name: string;
  price: number;
  qty: number;
}

@Component({
  selector: 'app-templates-restaurant-ordering-demo',
  imports: [NxCard, NxCardContent, NxCardFooter, NxButton, DemoSection],
  templateUrl: './templates-restaurant-ordering-demo.html',
})
export class TemplatesRestaurantOrderingDemo {
  menu: MenuItem[] = [
    {
      category: 'Starters',
      name: 'Crispy Calamari',
      description: 'Lightly fried calamari served with a lemon-garlic aioli.',
      price: 9.5,
    },
    {
      category: 'Starters',
      name: 'Garden Bruschetta',
      description: 'Toasted baguette topped with tomato, basil, and olive oil.',
      price: 7.0,
    },
    {
      category: 'Mains',
      name: 'Margherita Pizza',
      description: 'Wood-fired pizza with San Marzano tomatoes and fresh mozzarella.',
      price: 14.0,
    },
    {
      category: 'Mains',
      name: 'Grilled Salmon',
      description: 'Pan-seared salmon with roasted vegetables and lemon butter.',
      price: 18.5,
    },
    {
      category: 'Mains',
      name: 'Classic Cheeseburger',
      description: 'Beef patty, cheddar, lettuce, and house sauce on a brioche bun.',
      price: 13.0,
    },
    {
      category: 'Desserts',
      name: 'Tiramisu',
      description: 'Espresso-soaked layers with mascarpone cream and cocoa.',
      price: 6.5,
    },
  ];

  get categories(): string[] {
    return [...new Set(this.menu.map((item) => item.category))];
  }

  itemsByCategory(category: string): MenuItem[] {
    return this.menu.filter((item) => item.category === category);
  }

  cart: CartItem[] = [
    { name: 'Margherita Pizza', price: 14.0, qty: 2 },
    { name: 'Grilled Salmon', price: 18.5, qty: 1 },
    { name: 'Tiramisu', price: 6.5, qty: 1 },
  ];

  deliveryFee = 3.5;

  get subtotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  get total(): number {
    return this.subtotal + this.deliveryFee;
  }

  increment(item: CartItem): void {
    item.qty++;
  }

  decrement(item: CartItem): void {
    if (item.qty > 1) {
      item.qty--;
    }
  }

  lineTotal(item: CartItem): number {
    return item.price * item.qty;
  }

  menuCode = `<nx-card variant="outlined">
    <nx-card-content>
        <div class="block-hero-media">Image placeholder</div>
        <div class="template-profile-name">Margherita Pizza</div>
        <p>Wood-fired pizza with San Marzano tomatoes and fresh mozzarella.</p>
        <strong>$14.00</strong>
    </nx-card-content>
    <nx-card-footer>
        <nx-button variant="primary" size="small">Add to cart</nx-button>
    </nx-card-footer>
</nx-card>`;

  cartCode = `<nx-card variant="outlined">
    <nx-card-content>
        <div>
            <span>Margherita Pizza</span>
            <nx-button variant="outline" size="small" (click)="decrement(item)">-</nx-button>
            2
            <nx-button variant="outline" size="small" (click)="increment(item)">+</nx-button>
            <strong>$28.00</strong>
        </div>
        <div>Subtotal: $39.00</div>
        <div>Delivery Fee: $3.50</div>
        <div><strong>Total: $42.50</strong></div>
        <nx-button variant="primary">Place Order</nx-button>
    </nx-card-content>
</nx-card>`;
}
