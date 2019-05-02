import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentComponent } from './document/document.component';
import { CodeeditorComponent } from './codeeditor/codeeditor.component';
import { DocumentService } from './services/document.service';
import { CodeeditorService } from './services/codeeditor.service';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };


import { AceEditorModule } from 'ng2-ace-editor';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentListComponent,
    DocumentComponent,
    CodeeditorComponent,
    LoginComponent,
    EditorPageComponent,
    RegisterComponent,
    UserhomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng5SliderModule,
  ],
  providers: [DocumentService, CodeeditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
