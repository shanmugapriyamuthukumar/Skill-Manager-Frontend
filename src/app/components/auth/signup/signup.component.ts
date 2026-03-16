import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';   // <-- import RouterLink
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink]   // <-- add RouterLink here
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signup() {
    if (this.signupForm.invalid) return;

    const { username, email, password } = this.signupForm.value;

    this.api.post('/auth/register', {
      name: username,
      email,
      password,
      role: 'EMPLOYEE'
    }).subscribe({
      next: () => {
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']);   // ✅ navigate back to login
      },
      error: (err) => {
        console.error('Signup failed:', err);
        alert('Signup failed. Please try again.');
      }
    });
  }
}
