import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8001/users/';

  create(user: { id: string; name: string; surname: string; email: string; birth_date: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
