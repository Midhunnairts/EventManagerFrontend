import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Search, Filter, SortAsc, MapPin, Calendar, Clock, User } from 'lucide-angular';
import { EventService } from '../../core/services/event.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly SortIcon = SortAsc;
  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly ClockIcon = Clock;
  readonly UserIcon = User;

  activeTab: 'upcoming' | 'past' = 'upcoming';
  allEvents: any[] = [];
  events: any[] = [];
  loading = true;
  isOrganizer = false;

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.userValue;
    this.isOrganizer = user?.role === 'Organizer';
    this.fetchEvents();
  }

  fetchEvents() {
    this.loading = true;
    this.eventService.getEvents().subscribe({
      next: (data) => {
        console.log('Events Received:', data);
        this.allEvents = data;
        this.filterEvents();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.loading = false;
      }
    });
  }

  filterEvents() {
    const now = new Date();
    if (this.activeTab === 'upcoming') {
      this.events = this.allEvents.filter(e => new Date(e.eventDate) >= now);
    } else {
      this.events = this.allEvents.filter(e => new Date(e.eventDate) < now);
    }
  }

  setTab(tab: 'upcoming' | 'past') {
    this.activeTab = tab;
    this.filterEvents();
  }
}
