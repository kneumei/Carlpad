import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewChecked} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'carlpad-data-preview',
    template: `
    <div #scrollMe class="preview">
        <ul>
            <li *ngFor="let d of data">
                {{d}}
            </li>
        </ul>
    </div>
    `,
    styles:[
        `.preview {
            background: black; 
            color: green; 
            font-weight: bolder; 
            font-family: monospace; 
            font-size: x-large;
            max-height: 500px; 
            min-height: 500px; 
            min-width: 400px;
            overflow-y: scroll;
        }`,
        `ul {
            list-style-type: none;
            padding-left: 10px
        }`
    ]
})
export class CarlpadDataPreview implements OnInit, AfterViewChecked {
    @Input() dataObservable: Observable<string>;
    private _data = new Array<string>();
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    private readonly outputBufferLength = 100;

    ngOnInit(){
        this.dataObservable.subscribe((data) => {          
            this._data.push("> " + data);
            while(this._data.length > this.outputBufferLength){
                this._data.shift();
            }
        })
    }

    ngAfterViewChecked() {        
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } 

    get data(){
        return this._data;
    }
}