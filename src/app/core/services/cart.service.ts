import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  public cart$ = this.cartItems.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  addToCart(event: any, attendees: any[]) {
    const currentItems = this.cartItems.value;
    const existingIndex = currentItems.findIndex(item => item.eventId === event._id);

    if (existingIndex > -1) {
      currentItems[existingIndex].attendees = [...currentItems[existingIndex].attendees, ...attendees];
    } else {
      currentItems.push({
        eventId: event._id,
        eventTitle: event.title,
        price: event.price,
        attendees: attendees
      });
    }

    this.updateCart(currentItems);
  }

  private updateCart(items: any[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItems.next(items);
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cartItems.next([]);
  }

  getCartTotal() {
    return this.cartItems.value.reduce((total, item) => {
      return total + (item.price * item.attendees.length);
    }, 0);
  }

  get itemsValue() {
    return this.cartItems.value;
  }
}
