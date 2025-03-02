import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CheckoutService } from '../../../services/checkout.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimaryButtonComponent, RouterLink],
  template: `
    <div class="p-6 bg-slate-100 rounded-xl shadow-xl border mb-6">
      <h3 class="text-xl mb-4">Payment Options</h3>
      <form [formGroup]="paymentForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-2">
            <input type="radio" id="creditCard" value="creditCard" formControlName="paymentMethod" class="w-4 h-4">
            <label for="creditCard">Credit Card</label>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <input type="radio" id="paypal" value="paypal" formControlName="paymentMethod" class="w-4 h-4">
            <label for="paypal">PayPal</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="radio" id="applePay" value="applePay" formControlName="paymentMethod" class="w-4 h-4">
            <label for="applePay">Apple Pay</label>
          </div>
          <div *ngIf="paymentForm.get('paymentMethod')?.invalid && paymentForm.get('paymentMethod')?.touched" class="text-red-500 text-sm mt-1">
            Payment method is required
          </div>
        </div>

        <div *ngIf="paymentForm.get('paymentMethod')?.value === 'creditCard'">
          <div class="flex flex-col mb-4">
            <label for="cardNumber" class="mb-1">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              formControlName="cardNumber"
              class="p-2 border rounded"
              placeholder="1234 5678 9012 3456"
            />
            <div *ngIf="paymentForm.get('cardNumber')?.invalid && paymentForm.get('cardNumber')?.touched" class="text-red-500 text-sm mt-1">
              Valid card number is required
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex flex-col">
              <label for="expiryDate" class="mb-1">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                formControlName="expiryDate"
                class="p-2 border rounded"
                placeholder="MM/YY"
              />
              <div *ngIf="paymentForm.get('expiryDate')?.invalid && paymentForm.get('expiryDate')?.touched" class="text-red-500 text-sm mt-1">
                Valid expiry date is required
              </div>
            </div>
            <div class="flex flex-col">
              <label for="cvv" class="mb-1">CVV</label>
              <input
                type="text"
                id="cvv"
                formControlName="cvv"
                class="p-2 border rounded"
                placeholder="123"
              />
              <div *ngIf="paymentForm.get('cvv')?.invalid && paymentForm.get('cvv')?.touched" class="text-red-500 text-sm mt-1">
                CVV is required
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-6">
          <a routerLink="/checkout/shipping" class="text-blue-500">← Back to Shipping</a>
          <app-primary-button type="submit" label="Complete Order" [disabled]="paymentForm.invalid"></app-primary-button>
        </div>
      </form>
    </div>
  `,
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private checkoutService: CheckoutService
  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
    });
    
    // Add conditional validators when payment method changes
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      const cardNumberControl = this.paymentForm.get('cardNumber');
      const expiryDateControl = this.paymentForm.get('expiryDate');
      const cvvControl = this.paymentForm.get('cvv');
      
      if (method === 'creditCard') {
        cardNumberControl?.setValidators([Validators.required]);
        expiryDateControl?.setValidators([Validators.required]);
        cvvControl?.setValidators([Validators.required]);
      } else {
        cardNumberControl?.clearValidators();
        expiryDateControl?.clearValidators();
        cvvControl?.clearValidators();
      }
      
      cardNumberControl?.updateValueAndValidity();
      expiryDateControl?.updateValueAndValidity();
      cvvControl?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    // Load saved payment info if available
    const savedPayment = this.checkoutService.paymentInfo();
    if (savedPayment) {
      this.paymentForm.patchValue(savedPayment);
    }
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      // Save payment info
      this.checkoutService.setPaymentInfo(this.paymentForm.value);
      
      // Show confirmation and clear checkout data
      alert('Order placed successfully!');
      this.checkoutService.clearCheckoutData();
      
      // Navigate back to home page
      this.router.navigate(['/']);
    }
  }
}