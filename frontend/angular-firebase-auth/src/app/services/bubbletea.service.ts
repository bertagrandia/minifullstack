import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BubbleTea } from '../model/bubblete.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class BubbleteaService {

   private http = inject(HttpClient);
   private apiUrl = 'http://127.0.0.1:8000/bubbleteas/';

   getAll(): Observable<BubbleTea[]> {
      return this.http.get<any[]>(this.apiUrl).pipe(
         map(items => items.map(item => ({
            id: String(item.bubbletea_id),
            name: item.nombre,
            flavor: item.tipo_bubbletea,
            price: item.precio
         })))
      );
   }

   getById(id: string): Observable<BubbleTea> {
      return this.http.get<any>(`${this.apiUrl}${id}`).pipe(
         map(item => ({
            id: String(item.bubbletea_id),
            name: item.nombre,
            flavor: item.tipo_bubbletea,
            price: item.precio
         }))
      );
   }

}
