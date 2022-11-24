import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  url = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  addBook(bk: Book) {
    return this.http.post(this.url, bk);
  }

  getBookList() {
    return this.http.get<Book[]>(this.url);
  }

  deleteBook(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateBook(bk: Book) {
    return this.http.put(`${this.url}/${bk._id}`, bk);
  }
}
