import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LucideAngularModule, UserPlus } from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  readonly UserPlusIcon = UserPlus;
  user = { name: '', email: '', password: '', confirmPassword: '', role: 'User' };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    
    const { confirmPassword, ...userData } = this.user;
    this.authService.register(userData).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => this.error = err.error.message || 'Registration failed'
    });
  }
}
