import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pizza } from '@cat/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor(private http: HttpClient) {}

  getPizzaList(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>('/api/pizza/list');
  }
}
