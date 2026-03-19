import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['login.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule, CommonModule]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  // ✅ EXISTING FEATURES
  showPassword: boolean = false;
  isLoading: boolean = false;
  isDarkMode: boolean = false;

  // ✅ NEW: Logout Message
  showLogoutMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute   // ✅ ADDED
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // ✅ INIT (CHECK LOGOUT PARAM)
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['logout'] === 'true') {
        this.showLogoutMessage = true;

        // auto hide after 3 sec
        setTimeout(() => {
          this.showLogoutMessage = false;
        }, 3000);
      }
    });
  }

  // ✅ GETTERS
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // ✅ PASSWORD TOGGLE
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // ✅ DARK MODE
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode');
  }

  // ✅ LOGIN FUNCTION (UNCHANGED + LOADER)
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.isLoading = true;

    this.api.post('/auth/login', { email, password })
      .subscribe({
        next: (res: any) => {

          this.isLoading = false;

          localStorage.setItem('jwt', res.token);

          if (res.role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/employee/dashboard']);
          }
        },
        error: (err) => {

          this.isLoading = false;

          console.error('Login failed:', err);
          alert('Login failed. Please check your credentials.');
        }
      });
  }
}