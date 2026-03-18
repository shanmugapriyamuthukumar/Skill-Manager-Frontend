import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-project',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-project.html'
})
export class DeleteProjectComponent {
  id: number = 0;

  constructor(private http: HttpClient) {}

  deleteProject() {
    const token = localStorage.getItem('jwt');
    this.http.delete(`http://localhost:9090/projects/${this.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => alert('Project deleted successfully'),
      error: (err) => {
        console.error('Error deleting project:', err);
        alert(err.error?.error || 'Error deleting project');
      }
    });
  }
}
