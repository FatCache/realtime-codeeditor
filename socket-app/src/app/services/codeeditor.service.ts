import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CodeeditorService {
  
  _currentCode = this.socket.fromEvent<any>('currentCode')  
  _deltasHistory = this.socket.fromEvent<any[]>('deltasHistory').pipe(
    shareReplay(1)
  );;

  constructor(private socket:Socket) { }

  updateDocument(delta: any) {
    this.socket.emit("updateCodeDocument",delta);
  }
  
  editDocument(document: Document) {
    this.socket.emit('editDoc', document);
  }

  updateDeltas(){
    this.socket.emit("deltasHistory");
  }
  
  clearHistory(){
    this.socket.emit("clearHistory");
  }
  

  private docId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for(let i = 0; i < 5; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }


}
