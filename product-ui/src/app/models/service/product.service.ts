import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private baseUrl = `${environment.apiUrl}/produtos`;

  constructor( private http: HttpClient ){}

    getList(): Observable<Product[]>{
      return this.http.get<Product[]>(this.baseUrl);
    }

    getListById(id: string): Observable<Product>{
      return this.http.get<Product>(`${this.baseUrl}/${id}`);
    }

    create(product: Product): Observable<Product> {
      return this.http.post<Product>(this.baseUrl, product);
    }

    update(product: Product): Observable<Product> {
      return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
    }

    delete(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    searchByName(name: string): Observable<Product[]> {
      const params = new HttpParams().set('name', name);
      return this.http.get<Product[]>(this.baseUrl, { params });
    }
  }
