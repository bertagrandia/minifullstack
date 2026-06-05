import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BubbleTea, BubbleTeaPayload } from '../model/bubblete.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class BubbleteaService {

   private http = inject(HttpClient);
   private apiUrl = 'http://127.0.0.1:8001/bubbleteas/';

   private mapItem(item: any): BubbleTea {
      return {
         id: String(item.bubbletea_id),
         name: item.nombre,
         flavor: item.tipo_bubbletea,
         price: item.precio,
         stock: item.stock,
         descripcion: item.descripcion
      };
   }

   getAll(): Observable<BubbleTea[]> {
      return this.http.get<any[]>(this.apiUrl).pipe(
         map(items => items.map(item => this.mapItem(item)))
      );
   }

   getById(id: string): Observable<BubbleTea> {
      return this.http.get<any>(`${this.apiUrl}${id}`).pipe(
         map(item => this.mapItem(item))
      );
   }

   create(payload: BubbleTeaPayload): Observable<BubbleTea> {
      return this.http.post<any>(this.apiUrl, payload).pipe(
         map(item => this.mapItem(item))
      );
   }

   update(id: string, payload: BubbleTeaPayload): Observable<BubbleTea> {
      return this.http.put<any>(`${this.apiUrl}${id}`, payload).pipe(
         map(item => this.mapItem(item))
      );
   }

   delete(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}${id}`);
   }

}
