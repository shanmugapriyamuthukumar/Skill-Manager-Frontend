import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, FormsModule]
})
export class SignupComponent {

  signupForm: FormGroup;

  // ✅ SAME FEATURES AS LOGIN
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // ✅ GETTERS (for UI validation)
  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  // ✅ SHOW / HIDE PASSWORD
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // ✅ SIGNUP FUNCTION (UPDATED)
  signup() {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); // show validation errors
      return;
    }

    const { username, email, password } = this.signupForm.value;

    this.isLoading = true; // start loader

    this.api.post('/auth/register', {
      name: username,
      email,
      password,
      role: 'EMPLOYEE'
    }).subscribe({
      next: () => {

        this.isLoading = false;

        alert('Signup successful! Please login.');

        // ✅ redirect to login page
        this.router.navigate(['/login']);
      },

      error: (err) => {

        this.isLoading = false;

        console.error('Signup failed:', err);
        alert('Signup failed. Please try again.');
      }
    });
  }
}