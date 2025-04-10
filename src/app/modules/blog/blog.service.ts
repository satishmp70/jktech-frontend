import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private API_URL = `${environment.apiUrl}/blog`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.API_URL}`);
  }

  getMyBlogs() {
    return this.http.get(`${this.API_URL}/my`);
  }

  getOne(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  create(data: { title: string; content: string }) {
    return this.http.post(`${this.API_URL}`, data);
  }

  update(data: { id: number; title: string; content: string }) {
    return this.http.put(`${this.API_URL}/${data.id}`, data);
  }
}
