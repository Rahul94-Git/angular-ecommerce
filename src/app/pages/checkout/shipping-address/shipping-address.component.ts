import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CheckoutService } from '../../../services/checkout.service';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimaryButtonComponent],
  template: `
    <div class="p-6 bg-slate-100 rounded-xl shadow-xl border mb-6">
      <h3 class="text-xl mb-4">Shipping Address</h3>
      <form [formGroup]="shippingForm" (ngSubmit)="onSubmit()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="flex flex-col">
            <label for="firstName" class="mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              formControlName="firstName"
              class="p-2 border rounded"
            />
            <div *ngIf="shippingForm.get('firstName')?.invalid && shippingForm.get('firstName')?.touched" class="text-red-500 text-sm mt-1">
              First name is required
            </div>
          </div>
          <div class="flex flex-col">
            <label for="lastName" class="mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              formControlName="lastName"
              class="p-2 border rounded"
            />
            <div *ngIf="shippingForm.get('lastName')?.invalid && shippingForm.get('lastName')?.touched" class="text-red-500 text-sm mt-1">
              Last name is required
            </div>
          </div>
        </div>
        <div class="flex flex-col mb-4">
          <label for="address" class="mb-1">Address</label>
          <input
            type="text"
            id="address"
            formControlName="address"
            class="p-2 border rounded"
          />
          <div *ngIf="shippingForm.get('address')?.invalid && shippingForm.get('address')?.touched" class="text-red-500 text-sm mt-1">
            Address is required
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="flex flex-col">
            <label for="city" class="mb-1">City</label>
            <input
              type="text"
              id="city"
              formControlName="city"
              class="p-2 border rounded"
            />
            <div *ngIf="shippingForm.get('city')?.invalid && shippingForm.get('city')?.touched" class="text-red-500 text-sm mt-1">
              City is required
            </div>
          </div>
          <div class="flex flex-col">
            <label for="state" class="mb-1">State</label>
            <input
              type="text"
              id="state"
              formControlName="state"
              class="p-2 border rounded"
            />
            <div *ngIf="shippingForm.get('state')?.invalid && shippingForm.get('state')?.touched" class="text-red-500 text-sm mt-1">
              State is required
            </div>
          </div>
          <div class="flex flex-col">
            <label for="zipCode" class="mb-1">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              formControlName="zipCode"
              class="p-2 border rounded"
            />
            <div *ngIf="shippingForm.get('zipCode')?.invalid && shippingForm.get('zipCode')?.touched" class="text-red-500 text-sm mt-1">
              Zip code is required
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <app-primary-button type="submit" label="Continue to Payment" [disabled]="shippingForm.invalid"></app-primary-button>
        </div>
      </form>
    </div>
  `,
})
export class ShippingAddressComponent implements OnInit {
  shippingForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private checkoutService: CheckoutService
  ) {
    this.shippingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Populate form with saved address if available
    const savedAddress = this.checkoutService.shippingAddress();
    if (savedAddress) {
      this.shippingForm.patchValue(savedAddress);
    }
  }

  onSubmit() {
    if (this.shippingForm.valid) {
      // Save the shipping address data
      this.checkoutService.setShippingAddress(this.shippingForm.value);
      
      // Navigate to payment page
      this.router.navigate(['/checkout/payment']);
    }
  }
}