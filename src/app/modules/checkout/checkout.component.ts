import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, CreditCard, ShieldCheck, Ticket, Receipt } from 'lucide-angular';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  readonly CardIcon = CreditCard;
  readonly ShieldIcon = ShieldCheck;
  readonly TicketIcon = Ticket;
  readonly ReceiptIcon = Receipt;

  cartItems: any[] = [];
  total = 0;
  gst = 0;
  finalTotal = 0;
  loading = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.total = this.cartService.getCartTotal();
    this.gst = this.total * 0.18; // 18% GST
    this.finalTotal = this.total + this.gst;
  }

  processPayment() {
    if (this.cartItems.length === 0) return;
    
    this.loading = true;
    const user = this.authService.userValue;
    
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    const orderData = {
      eventId: this.cartItems[0].eventId,
      attendees: this.cartItems[0].attendees,
      totalAmount: this.finalTotal
    };

    const headers = { Authorization: `Bearer ${user.token}` };
    
    this.http.post('http://localhost:5001/api/orders', orderData, { headers }).subscribe({
      next: (order: any) => {
        this.cartService.clearCart();
        this.router.navigate(['/payment-success'], { queryParams: { orderId: order._id } });
      },
      error: (err) => {
        alert('Payment failed: ' + (err.error?.message || 'Unknown error'));
        this.loading = false;
      }
    });
  }
}
