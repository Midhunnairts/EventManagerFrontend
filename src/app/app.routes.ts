import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EventDetailsComponent } from './modules/events/event-details/event-details.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { PaymentSuccessComponent } from './modules/checkout/payment-success/payment-success.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
