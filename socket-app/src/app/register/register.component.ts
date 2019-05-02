import { Component, Inject, Renderer2, OnInit, ElementRef } from '@angular/core';
import { DocumentService, TokenPayload } from 'src/app/services/document.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import {DOCUMENT} from '@angular/platform-browser';
import { HttpBackend } from '@angular/common/http';
import { hasParentInjector } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };
  public frmSignup: FormGroup;

  constructor(private auth: DocumentService, private router: Router,private fb: FormBuilder,private _render2: Renderer2, 
    @Inject(DOCUMENT) private _document) {
    this.frmSignup = this.createSignupForm();

  }

  public ngOnInit(){

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
  
  var name = $("#namee").val();
  var email = $("#email").val();
  var password = $("#password").val();

  $.ajax({
url:"http://localhost:3000/users/posusers",
type: "POST",
data: {'name':name,'password':password, 'email':email},
success: function(data){
  
}
  });
    
  });




  $("#btnupdate").click(function(){
    var name = $("#nameupdate").val();
    var email = $("#email").val();
    var password = $("#password").val();
  
    $.ajax({
  url:"http://localhost:3000/users/"+email+"/updateuser",
  type: "PUT",
  data: {'name':name, 'email':email},
  success: function(data){
    alert("User updated")
  }
    });
      
    });


  
  
  });`;    this._render2.appendChild(this._document.body, v);

}

  // senddata(){
  //   this.hp.send()
  // }
  

  register() {
    this.auth.register(this.credentials);
      // if(this.credentials.email == "" || this.credentials.name == "" || this.credentials.password == ""){
      //   alert("Please fill all fields to register");}
      //   else

 
      this.router.navigateByUrl('/login');
    
  }
  back(){
    console.log("aad");
    this.router.navigateByUrl('/home');
  }
  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        name:[],
       
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      }
    );
  }

}