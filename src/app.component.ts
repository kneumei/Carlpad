import { Component } from '@angular/core';

@Component({
  selector: 'App',
  template: `
  <div id="app">
    <div id="sidebar">
      <div>
      <div class="selectbox" [class.selecthidden] = "selected!=='connection'"></div>
      <i class="fa fa-3x fa-exchange" (click)="selected='connection'"></i>
      </div> 

      <div>
      <div class="selectbox" [class.selecthidden] = "selected!=='gamepad'"></div>
      <i class="fa fa-3x fa-gamepad" (click)="selected='gamepad'"></i>  
      </div>
    </div>
    <div id="content">
      <carlpad-connection *ngIf="selected === 'connection'"></carlpad-connection>
    </div>
  </div>
  `,
  styles: [
    `#app{
    }`,
    `#sidebar {
      background:#333333;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 75px;
    }`,
    `#content {
      margin-left:75px;   
    }
    `,
    `.fa {
      color:lightgrey;
      margin-top: 10px;
      cursor: pointer;
      margin-left: 4px;
      display: inline-table
    }`,
    `.fa:before {
      margin-left: 8px; 
    }`,
    `.fa:hover{
      color: white
    }`,
    `.selectbox {
      float:left;
      border: 3px solid white;
      height: 40px;
      margin-top: 16px;
      margin-left: -2px;
      border-radius: 50px
    }`,
    `.selecthidden{
      border-color: #333333;
    }`
  ],
})
export class AppComponent {
  selected = 'connection';
}