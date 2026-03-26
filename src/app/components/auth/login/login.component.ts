import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['login.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule, CommonModule]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  showPassword: boolean = false;
  isLoading: boolean = false;
  isDarkMode: boolean = false;

  showLogoutMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToastService  
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['logout'] === 'true') {
        this.showLogoutMessage = true;
        this.toastService.show('You have been logged out successfully', 'success'); 
        setTimeout(() => {
          this.showLogoutMessage = false;
        }, 3000);
      }
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode');
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastService.show('Please enter valid email and password', 'error'); 
      return;
    }

    const { email, password } = this.loginForm.value;
    this.isLoading = true;

    this.api.post('/auth/login', { email, password })
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          localStorage.setItem('jwt', res.token);

          this.toastService.show('Login successful!', 'success'); 

          if (res.role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/employee/dashboard']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Login failed:', err);
          this.toastService.show('Login failed. Please check your credentials.', 'error'); 
        }
      });
  }
}
