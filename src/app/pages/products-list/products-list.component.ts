import { Component, signal } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  stock?: number;
};

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
    <div class="p-8 grid grid-cols-2 gap-4">
      @for (product of products(); track product.id) {
      <app-product-card [product]="product" />
      }
    </div>
  `,
  styles: ``,
})
export class ProductsListComponent {
  async ngOnInit() {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    this.products.set(data);
    console.log(this.products());
  }
  products = signal<Product[]>([]);
}
