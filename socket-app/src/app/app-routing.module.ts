import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './document/document.component';
import { RegisterComponent } from './register/register.component';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { AppComponent } from './app.component';
import { UserhomeComponent } from './userhome/userhome.component';

const routes: Routes = [
  
  {path : 'login', component : LoginComponent},
  {path : 'home' , component : AppComponent},
  {path : 'userhome' , component : UserhomeComponent},
  {path : '' , component :RegisterComponent },
  {path : 'editor-page', component : EditorPageComponent}
 

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
