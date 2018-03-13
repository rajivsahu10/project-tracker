import { Component, Input, ViewChild, ElementRef } from '@angular/core';
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

  updateLogValue(receivedLogValue : string) {
    this.logValue = receivedLogValue;
    console.log("AppComponent:updateLogValue:this.logValue:["+this.logValue+"]");
    this.updateVersion++;
  }
 
  
}
