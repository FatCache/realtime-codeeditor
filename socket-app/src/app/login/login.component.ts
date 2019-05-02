import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DocumentService, TokenPayload } from 'src/app/services/document.service';
import { Router } from '@angular/router';
import {DOCUMENT} from '@angular/platform-browser';
import { CustomValidators } from '../custom-validators';
import {AppRoutingModule} from '../app-routing.module';
//import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
    
  };

  constructor(private auth: DocumentService, private router: Router,private _render2: Renderer2, 
    @Inject(DOCUMENT) private _document) {

  }

  public ngOnInit(){
    //this.router.navigateByUrl('/userhome');

    let s = this._render2.createElement('script');
    s.type = "text/javascript";
    s.onload = this.loadnext.bind(this);
    s.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    s.text = ``;
    this._render2.appendChild(this._document.body, s);

    
  }

loadnext(){

  const v = this._render2.createElement('script');
  v.type = "text/javascript";
  v.text = `
  $(document).ready(function(){

  $("#btnsubmit").click(function(){
  var password = $("#password").val();
  var email = $("#email").val();
  $.get("http://localhost:3000/users/allusers",function(data, status){
for(var bb=0;bb<data.length;bb++){
// alert(password);
 //alert(email);
  //alert(data[bb].email);
  //alert(data[bb].password);
if(data[bb].email == email && data[bb].password == password){
  location.href = "/userhome";
}
//else
//alert("User email or password wrong");
//break;
}
  });
  });
    
  });`;    this._render2.appendChild(this._document.body, v);

}



  login() {
   // console.log("fsfsdfsfsfs");
   // this.router.navigateByUrl('/userhome');
    // this.auth.login(this.credentials).subscribe(() => {
    //   this.router.navigateByUrl('/home');
    // }, (err) => {
    //   alert("May be email or password is wrong");
    //   console.error(err);
    // }); 
  }

  // loginFormValidation():FormGroup {
  //   return this.fb.group(
  //     {
        
  //       email: [
  //         null,
  //         Validators.compose([Validators.email, Validators.required])
  //       ],
  //       password: [
  //         null,
  //         Validators.compose([
  //           Validators.required,
  //           // check whether the entered password has a number
  //           CustomValidators.patternValidator(/\d/, {
  //             hasNumber: true
  //           }),
  //           // check whether the entered password has upper case letter
  //           CustomValidators.patternValidator(/[A-Z]/, {
  //             hasCapitalCase: true
  //           }),
  //           // check whether the entered password has a lower case letter
  //           CustomValidators.patternValidator(/[a-z]/, {
  //             hasSmallCase: true
  //           }),
  //           // check whether the entered password has a special character
  //           CustomValidators.patternValidator(
  //             /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  //             {
  //               hasSpecialCharacters: true
  //             }
  //           ),
  //           Validators.minLength(8)
  //         ])
  //       ],
  //     }
  //   );
  // }
}
