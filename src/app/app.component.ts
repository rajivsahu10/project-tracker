import { Component, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ElectronService } from "ngx-electron";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logValue: string = "No Result....Yet"
  updateVersion: number = 0;
  theZone: NgZone;
  constructor(private ngZone: NgZone) {
    this.theZone = ngZone;
  }
  updateLogValue(receivedLogValue : string) {
    this.theZone.run(()=> {
      this.logValue = receivedLogValue;
    console.log("AppComponent:updateLogValue:this.logValue:["+this.logValue+"]");
    this.updateVersion++;
    });    
  }
 
  
}
