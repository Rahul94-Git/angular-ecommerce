import { Component, computed, inject, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-slate-100 p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl">Order Summary</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <span class="text-lg">Total</span>
          <span class="text-lg font-bold">{{ '$ ' + total() }}</span>
        </div>
        @if (showCheckoutButton) {
          <app-primary-button label="Proceed to checkout" (click)="proceedToCheckout()" />
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class OrderSummaryComponent {
  cartService = inject(CartService);
  router = inject(Router);
  
  @Input() showCheckoutButton = true;

  total = computed(() => {
    let total = 0;
    for (const item of this.cartService.cart()) {
      total += item.price;
    }

    return total;
  });
  
  proceedToCheckout() {
    this.router.navigate(['/checkout/shipping']);
  }
}
