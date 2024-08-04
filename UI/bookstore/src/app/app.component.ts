import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

var flag: boolean = false;
var updateId: string;
var addBookRequest;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'BookStore';
  http = inject(HttpClient);

  booksForm = new FormGroup({
    title: new FormControl<string>(''),
    description: new FormControl<string | null>(null),
    author: new FormControl<string>(''),
    isbn: new FormControl<string>('')
  })

  books$ = this.getBooks();
  flag = false;

  onFormSubmit(){
    console.log(this.booksForm.value);
    addBookRequest = {
      title: this.booksForm.value.title,
      description: this.booksForm.value.description,
      author: this.booksForm.value.author,
      isbn: this.booksForm.value.isbn,
    }

    if (this.booksForm.valid){
    if (flag==false){
    this.http.post('https://localhost:7074/api/Books', addBookRequest).subscribe({
      next: (value) => {
        console.log(value);
        this.books$ = this.getBooks();
        this.booksForm.reset();
      }
    });
  }
  if (flag==true){
    this.onUpdateButton(updateId, addBookRequest);
  }
}

}

  onDelete(id: string){
    this.http.delete(`https://localhost:7074/api/Books/${id}`).subscribe({
      next: (value) => {
        alert('Item deleted');
        this.books$ = this.getBooks();
      }
    })

  }

 onUpdate(id: string){
    this.http.get<Book>(`https://localhost:7074/api/Books/${id}`).subscribe({
    next: (data) => {      
    console.log(data);
    this.booksForm.controls.title.setValue(data.title);
    this.booksForm.controls.description.setValue(data.description);
    this.booksForm.controls.author.setValue(data.author);
    this.booksForm.controls.isbn.setValue(data.isbn);
    flag=true;
    updateId = id;
    this.books$ = this.getBooks();
  }
  })
  alert('Item pulled to update, please update and save');
 }

 onUpdateButton(id: string, addBookRequest: {}){
  if (flag==true){
    this.http.post(`https://localhost:7074/api/Books/${id}`, addBookRequest).subscribe({
      next: (value) => {
        console.log(value);
        this.books$ = this.getBooks();
        this.booksForm.reset();
      }
    });
  }
  this.books$ = this.getBooks();
  alert('Item updated in the list');
  flag=false;
 }

  private getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('https://localhost:7074/api/Books');
  }
}

