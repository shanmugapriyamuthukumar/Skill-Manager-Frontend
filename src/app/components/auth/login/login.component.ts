import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';   // <-- import RouterLink
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['login.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink]   // <-- add RouterLink here
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.api.post('/auth/login', { email, password })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('jwt', res.token);

          if (res.role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/employee/dashboard']);
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login failed. Please check your credentials.');
        }
      });
  }
}
