import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderSummaryComponent } from '../cart/order-summary/order-summary.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterOutlet, OrderSummaryComponent],
  template: `
    <div class="p-6">
      <h2 class="text-2xl mb-6">Checkout</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="col-span-2">
          <router-outlet></router-outlet>
        </div>
        <div>
          <app-order-summary [showCheckoutButton]="false"></app-order-summary>
        </div>
      </div>
    </div>
  `,
})
export class CheckoutComponent {
  cartService = inject(CartService);
}