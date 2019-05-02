import { Component } from '@angular/core';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})

export class EditorPageComponent {
  title = 'Realtime Text Editor';

  codeEditorFlag = false;
  textEditorFlag = false;

  toggleTextEditor():void {
    this.textEditorFlag = !this.textEditorFlag;
  }

  toggleCodeEditor(): void {
    this.codeEditorFlag = !this.codeEditorFlag;
  }
}
