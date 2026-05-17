import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../../core/services/event.service';
import { CartService } from '../../../core/services/cart.service';
import { LucideAngularModule, MapPin, Calendar, Clock, Users, Ticket, CheckCircle, ChevronLeft, UserPlus, Trash2 } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent implements OnInit {
  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly ClockIcon = Clock;
  readonly UsersIcon = Users;
  readonly TicketIcon = Ticket;
  readonly CheckIcon = CheckCircle;
  readonly BackIcon = ChevronLeft;
  readonly AddUserIcon = UserPlus;
  readonly DeleteIcon = Trash2;

  event: any;
  loading = true;
  attendees: any[] = [{ name: '', role: 'Guest' }];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchEventDetails(id);
    }
  }

  fetchEventDetails(id: string) {
    this.eventService.getEventById(id).subscribe({
      next: (data) => {
        this.event = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching event details:', err);
        this.loading = false;
      }
    });
  }

  addAttendee() {
    this.attendees.push({ name: '', role: 'Guest' });
  }

  removeAttendee(index: number) {
    this.attendees.splice(index, 1);
  }

  bookNow() {
    const validAttendees = this.attendees.filter(a => a.name.trim() !== '');
    if (validAttendees.length === 0) {
      alert('Please add at least one attendee name.');
      return;
    }
    this.cartService.addToCart(this.event, validAttendees);
    this.router.navigate(['/checkout']);
  }
}
