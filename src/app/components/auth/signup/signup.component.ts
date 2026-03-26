import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast.service'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, FormsModule]
})
export class SignupComponent {

  signupForm: FormGroup;

  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    public toastService: ToastService   
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get username() { return this.signupForm.get('username'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.toastService.show('Please fill all required fields correctly', 'error'); 
      return;
    }

    const { username, email, password } = this.signupForm.value;
    this.isLoading = true;

    this.api.post('/auth/register', {
      name: username,
      email,
      password,
      role: 'EMPLOYEE'
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastService.show('Signup successful! Please login.', 'success'); 
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Signup failed:', err);
        this.toastService.show('Signup failed. Please try again.', 'error'); 
      }
    });
  }
}
