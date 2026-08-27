import { Component } from '@angular/core';
import { NxCard, NxCardImage, NxCardContent, NxCardFooter, NxBadge, NxRating, NxButton, NxTag } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-how-to-buy-product-demo',
  imports: [NxCard, NxCardImage, NxCardContent, NxCardFooter, NxBadge, NxRating, NxButton, NxTag, DemoSection],
  templateUrl: './how-to-buy-product-demo.html',
  styleUrl: './how-to-buy-product-demo.scss',
})
export class HowToBuyProductDemo {
  productImage = 'https://picsum.photos/seed/nexaui-product-1/500/400';
  price = 79;
  rating = 4;
  quantity = 1;
  added = false;

  increment(): void {
    this.quantity += 1;
  }

  decrement(): void {
    this.quantity = Math.max(1, this.quantity - 1);
  }

  get total(): string {
    return (this.price * this.quantity).toFixed(2);
  }

  addToCart(): void {
    this.added = true;
    setTimeout(() => (this.added = false), 2000);
  }

  code = `<nx-card variant="outlined">
    <nx-card-image>
        <img [src]="productImage" alt="Wireless Headphones" style="width: 100%; object-fit: cover;" />
    </nx-card-image>
    <nx-card-content>
        <nx-tag variant="outline">Audio</nx-tag>
        <h3>Wireless Headphones</h3>
        <nx-rating [value]="rating" readonly></nx-rating>
        <strong>\${{ price }}.00</strong>
        <nx-badge variant="success" size="small">In Stock</nx-badge>

        <div class="qty-stepper">
            <nx-button variant="secondary" size="small" (click)="decrement()">-</nx-button>
            <span>{{ quantity }}</span>
            <nx-button variant="secondary" size="small" (click)="increment()">+</nx-button>
        </div>
    </nx-card-content>
    <nx-card-footer>
        <nx-button variant="primary" [fullWidth]="true" (click)="addToCart()">
            {{ added ? 'Added to Cart!' : 'Add to Cart - $' + total }}
        </nx-button>
    </nx-card-footer>
</nx-card>`;

  tsCode = `price = 79;
rating = 4;
quantity = 1;
added = false;

increment(): void {
  this.quantity += 1;
}

decrement(): void {
  this.quantity = Math.max(1, this.quantity - 1);
}

get total(): string {
  return (this.price * this.quantity).toFixed(2);
}

addToCart(): void {
  this.added = true;
  setTimeout(() => (this.added = false), 2000);
}`;
}
