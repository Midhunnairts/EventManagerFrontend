import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, Filter, SortAsc, MapPin, Calendar, Clock, User } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly SortIcon = SortAsc;
  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly ClockIcon = Clock;
  readonly UserIcon = User;

  activeTab: 'upcoming' | 'past' = 'upcoming';
  
  events = [
    {
      title: 'Tech Conference 2024',
      organizer: 'Tech Solutions Inc.',
      venue: 'Innovation Hub, San Francisco',
      date: '2024-06-15',
      time: '10:00 AM',
      seatsLeft: 50,
      price: 99,
      banner: 'https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?w=800'
    },
    {
      title: 'Music Festival',
      organizer: 'Sound Waves',
      venue: 'Central Park, NY',
      date: '2024-07-20',
      time: '04:00 PM',
      seatsLeft: 120,
      price: 45,
      banner: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800'
    },
    {
      title: 'AI Workshop',
      organizer: 'AI Future',
      venue: 'Silicon Valley Center',
      date: '2024-08-05',
      time: '09:00 AM',
      seatsLeft: 30,
      price: 150,
      banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800'
    }
  ];

  setTab(tab: 'upcoming' | 'past') {
    this.activeTab = tab;
  }
}
