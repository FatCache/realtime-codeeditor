import { Component, OnInit } from '@angular/core';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent {
  constructor() { }

  title = 'Realtime Text Editor';

  codeEditorFlag = false;
  textEditorFlag = false;

  toggleTextEditor():void {
    this.textEditorFlag = true;
    this.codeEditorFlag = false;
  }

  toggleCodeEditor(): void {
    this.textEditorFlag = false;
    this.codeEditorFlag = true;
  }
 

}

