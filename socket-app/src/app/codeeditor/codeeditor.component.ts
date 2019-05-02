import { Component, OnInit, ViewChild, Injectable, OnDestroy, OnChanges, ViewEncapsulation } from '@angular/core';
import { Options, ChangeContext, PointerType } from 'ng5-slider';
import { FormGroup, FormControl } from '@angular/forms';

import { CodeeditorService } from 'src/app/services/codeeditor.service';
import { Socket } from 'ngx-socket-io';
import { Subscription, Observable, interval, of, range } from 'rxjs';
import { skipWhile, takeWhile, elementAt } from 'rxjs/operators';
import { reject } from 'q';
import { Editor } from 'brace';

import "ace-builds/webpack-resolver";


@Component({
  selector: 'app-codeeditor',
  templateUrl: './codeeditor.component.html', 
  styleUrls: ['./codeeditor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class CodeeditorComponent implements OnInit, OnChanges {
  @ViewChild('editor') editor;

  text: string = "Hello Editor";
  _applyingChanges : boolean = false;
  private _thiscurrentdelta : Subscription;
  private _deltaLengthListner : Subscription = new Subscription() ;
  history: Subscription = new Subscription();

  public deltaHistory$ : Observable<any[]>;

  // Slider Configuration
  sliderForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([0, 80])
  });
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1
  };

  _deltalengthDisplay: number;

  constructor(private codeeditorservice: CodeeditorService) { }
  
  ngOnInit() {
    // Load up the history of changes for the document
    this.deltaHistory$ = this.codeeditorservice._deltasHistory;

    this.history.add(
      this.deltaHistory$.subscribe(delta => {
        console.log(delta);
        this.options.ceil = delta.length; 
        delta.forEach(r => {
          {
            this._applyingChanges = true;
            this.editor.getEditor().session.getDocument().applyDeltas([r])
            this._applyingChanges = false;
          }
        })
        this.history.unsubscribe();  
      })
    )
 
    this.deltaHistory$.subscribe(delta => {
      console.log(delta.length)
      this._deltalengthDisplay = delta.length - 2;
    })
    
    this._thiscurrentdelta = this.codeeditorservice._currentCode.subscribe(deltas => {
      this._applyingChanges = true;
      this.editor.getEditor().session.getDocument().applyDeltas([deltas]);    
      this._applyingChanges = false;
    });

    // Listen to Length Updates on the even stream
    this._deltaLengthListner = this.codeeditorservice._deltasHistory.subscribe(deltas => {
      this._deltalengthDisplay = deltas.length;
    })

    console.log(this.options)
  }

  ngOnChanges () {
    console.log("ngOnChanged called")
  }
  
  ngAfterViewInit() {
    this.editor.setTheme("twilight");
    
      this.editor.getEditor().setOptions({
        enableBasicAutocompletion: true
      });
  
      this.editor.getEditor().commands.addCommand({
        name: "showOtherCompletions",
        bindKey: "Ctrl-.",
        exec: function (editor) {
        }
      })
  
      this.editor.getEditor().on("change", delta => {
        if(!this._applyingChanges) 
        {
          this.codeeditorservice.updateDocument(delta);
        }
      });

  }

  // For debugging
  onChange($event) {
    console.log("$event says: " + $event);
  }
  resetForm() {
    this.codeeditorservice.clearHistory();
  }

  // Clears history
  clearHistory(): void {
    this.codeeditorservice.clearHistory();
    this.editor.getEditor().session.setValue("");
  }

  ngOnDestroy():void {
    this._thiscurrentdelta.unsubscribe();
    this.history.unsubscribe();
    this._thiscurrentdelta.unsubscribe();
  }

  // Slider Methods
  setNewCeil(newCeil: number): void {
    // Due to change detection rules in Angular, we need to re-create the 
    // options object to apply the change
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.ceil = newCeil;
    this.options = newOptions;
  }

  logText = '';

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.logText += `onUserChangeEnd(${this.getChangeContextString(changeContext)})\n`;
  }

  getChangeContextString(changeContext: ChangeContext): void {
    this.onTimemachineChange(changeContext);
    console.log(`{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
           `value: ${changeContext.value}, ` +
           `highValue: ${changeContext.highValue}}`);
  }

  // Get the max and in value of the slider
  onTimemachineChange (changeContext: ChangeContext) {
    let min = changeContext.value;
    let max = changeContext.highValue;
    console.log(min + ":" + max);
    
    this.editor.getEditor().session.setValue("");
    
    range(min,max - min + 1).subscribe(num => {
      this.deltaHistory$.subscribe(delta => {
        this._applyingChanges = true;
        this.editor.getEditor().session.getDocument().applyDeltas([delta[num]])
        this._applyingChanges = false;
      }, err => console.log(err))
    })

  }
  themechanger($event):void{
   // console.log($event.target.value);
    this.editor.setTheme($event.target.value);
    //this.themeVal=$event.target.value;
   }

   modechanger($event):void{
     var result = $event.target.value
     if (result=="C++") {
       this.editor.setMode("c_cpp");
     }
     if (result=="javascript") {
      this.editor.setMode("javascript");
    }
     if (result=="Java") {
      this.editor.setMode("java");
    }

    if (result=="Python3") {
      this.editor.setMode("python");
    }


    }


}
