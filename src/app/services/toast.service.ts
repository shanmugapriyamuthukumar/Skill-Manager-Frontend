import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  message: string | null = null;
  type: 'success' | 'error' | null = null;

  show(msg: string, type: 'success' | 'error' = 'success', duration: number = 300) {
    this.message = msg;
    this.type = type;
    setTimeout(() => {
      this.message = null;
      this.type = null;
    }, duration);
  }
}
