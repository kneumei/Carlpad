import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'data-preview',
  templateUrl: './components/data-preview.component.html',
  styleUrls: ['./components/data-preview.component.css']
})
export class DataPreview implements OnInit, AfterViewChecked {
  @Input() dataObservable: Observable<string>;
  private _data = new Array<string>();
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  private readonly outputBufferLength = 100;

  ngOnInit() {
    this.dataObservable.subscribe((data) => {
      this._data.push("> " + data);
      while (this._data.length > this.outputBufferLength) {
        this._data.shift();
      }
    })
  }

  ngAfterViewChecked() {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  get data() {
    return this._data;
  }
}
