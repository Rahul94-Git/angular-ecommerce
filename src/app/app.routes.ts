import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ShippingAddressComponent } from './pages/checkout/shipping-address/shipping-address.component';
import { PaymentComponent } from './pages/checkout/payment/payment.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductsListComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'shipping',
        pathMatch: 'full'
      },
      {
        path: 'shipping',
        component: ShippingAddressComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      }
    ]
  },
];
