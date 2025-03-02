import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentInfo {
  paymentMethod: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private shippingAddressData = signal<ShippingAddress | null>(null);
  private paymentInfoData = signal<PaymentInfo | null>(null);

  get shippingAddress() {
    return this.shippingAddressData;
  }

  setShippingAddress(address: ShippingAddress) {
    this.shippingAddressData.set(address);
  }

  get paymentInfo() {
    return this.paymentInfoData;
  }

  setPaymentInfo(payment: PaymentInfo) {
    this.paymentInfoData.set(payment);
  }

  clearCheckoutData() {
    this.shippingAddressData.set(null);
    this.paymentInfoData.set(null);
  }
}