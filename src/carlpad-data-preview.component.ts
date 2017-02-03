import { Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'carlpad-data-preview',
    template: `
    <div>
        <ul>
            <li *ngFor="let d of data">
                {{d}}
            </li>
        </ul>
    </div>
    `

})
export class CarlpadDataPreview implements OnInit{
    @Input() dataObservable: Observable<string>;

    private _data = new Array<string>();

    ngOnInit(){
        this.dataObservable.subscribe((data) => this._data.push(data))
    }

    get data(){
        return this._data;
    }
}