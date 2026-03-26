import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component'; // adjust path if needed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],  // ✅ include ToastComponent
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}
