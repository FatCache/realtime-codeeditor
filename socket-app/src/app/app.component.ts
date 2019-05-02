import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private router: Router){

  }
 public ngOnInit(){
 // this.router.navigateByUrl('/');

  }

  title = 'Realtime Text Editor';

  codeEditorFlag = false;
  textEditorFlag = false;

  toggleTextEditor():void {
    this.textEditorFlag=true;
  this.codeEditorFlag=false;
  }

  toggleCodeEditor(): void {
    this.codeEditorFlag=true;
  this.textEditorFlag=false;
  }
}
