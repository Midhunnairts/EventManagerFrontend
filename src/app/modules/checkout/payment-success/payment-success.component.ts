import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { LucideAngularModule, CheckCircle, Download, Calendar, MapPin, Ticket } from 'lucide-angular';
import { jsPDF } from 'jspdf';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './payment-success.component.html',
})
export class PaymentSuccessComponent implements OnInit {
  readonly CheckIcon = CheckCircle;
  readonly DownloadIcon = Download;
  readonly CalendarIcon = Calendar;
  readonly MapPinIcon = MapPin;
  readonly TicketIcon = Ticket;

  order: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (orderId) {
      this.fetchOrderDetails(orderId);
    }
  }

  fetchOrderDetails(orderId: string) {
    const user = this.authService.userValue;
    if (!user) return;

    const headers = { Authorization: `Bearer ${user.token}` };

    this.http.get(`${environment.apiUrl}/orders/${orderId}`, { headers }).subscribe({
      next: (data) => {
        this.order = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching order:', err);
        this.loading = false;
      }
    });
  }

  downloadTicket() {
    const doc = new jsPDF();

    // Add styling and content to PDF
    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('EVENT TICKET', 105, 25, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Order ID: ${this.order._id}`, 20, 50);
    doc.text(`Booked on: ${new Date(this.order.createdAt).toLocaleDateString()}`, 20, 55);

    doc.setFontSize(18);
    doc.text(this.order.eventId.title, 20, 75);

    doc.setFontSize(12);
    doc.text(`Venue: ${this.order.eventId.venue}`, 20, 85);
    doc.text(`Date: ${new Date(this.order.eventId.eventDate).toLocaleDateString()}`, 20, 92);
    doc.text(`Time: ${new Date(this.order.eventId.eventDate).toLocaleTimeString()}`, 20, 99);

    doc.line(20, 110, 190, 110);

    doc.setFontSize(14);
    doc.text('Attendees:', 20, 125);

    doc.setFontSize(11);
    this.order.attendees.forEach((a: any, i: number) => {
      doc.text(`${i + 1}. ${a.name} (${a.role})`, 30, 135 + (i * 10));
    });

    doc.setFillColor(240, 240, 240);
    doc.rect(20, 250, 170, 20, 'F');
    doc.setFontSize(10);
    doc.text('Please carry a valid ID along with this ticket.', 105, 262, { align: 'center' });

    doc.save(`Ticket_${this.order.eventId.title.replace(/\s+/g, '_')}.pdf`);
  }
}
