import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../../core/services/event.service';
import { AuthService } from '../../../core/services/auth.service';
import { LucideAngularModule, CalendarPlus, MapPin, Tag, Image as ImageIcon, DollarSign, Users } from 'lucide-angular';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './create-event.component.html'
})
export class CreateEventComponent {
  readonly CalendarIcon = CalendarPlus;
  readonly MapPinIcon = MapPin;
  readonly TagIcon = Tag;
  readonly ImageIcon = ImageIcon;
  readonly DollarIcon = DollarSign;
  readonly UsersIcon = Users;

  eventData = {
    title: '',
    description: '',
    venue: '',
    eventDate: '',
    category: 'Tech',
    price: 0,
    maxAttendees: 100,
    tags: '',
    bannerImage: ''
  };

  loading = false;
  errorMessage = '';

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    
    const user = this.authService.userValue;
    if (!user || user.role !== 'Organizer') {
      this.errorMessage = 'Only Organizers can create events.';
      this.loading = false;
      return;
    }

    // Format tags from comma-separated string to array
    const formattedTags = this.eventData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    const payload = {
      ...this.eventData,
      tags: formattedTags
    };

    this.eventService.createEvent(payload, user.token).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Failed to create event. Please try again.';
      }
    });
  }
}
