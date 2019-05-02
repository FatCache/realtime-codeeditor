import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Document} from '../models/document'
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
  email: string;
  name: string;
  password: String;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  name: string;
  password: string;

}

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  // Events emitted by the socket server
  currentDocument = this.socket.fromEvent<Document>('document')  
  documents = this.socket.fromEvent<string[]>('documents');

  constructor(private socket:Socket,private http: HttpClient) { }

  // Three event types emitted which socket server is listening for
  getDocument(id:string){
    this.socket.emit('getDoc',id);
  }

  newDocument() {
    this.socket.emit('addDoc', {id: this.docId(), doc: ''});
  }

  editDocument(document: Document) {
    this.socket.emit('editDoc', document);
  }


  private docId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for(let i = 0; i < 5; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  public login(user: TokenPayload): Observable<any> {
    console.log(user.email)
    return this.request('post', 'login', user);
  }

  public register(user){
    console.log(user.email)
    this.http.post(`http://localhost:4200/src/register`, user);  
  }

  request(arg0: string, arg1: string, user: TokenPayload): Observable<any> {
    throw new Error("Method not implemented.");
  }
}


