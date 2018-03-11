import { Component } from '@angular/core';
import { ElectronService } from "ngx-electron";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logValue: string = "No Result....Yet"

  constructor(private _electronService: ElectronService) { }

  public loadData(): void {
    console.log("Load button clicked");
    console.log("sending request to ipcMain now ..");
    
    this._electronService.ipcRenderer.send('load-async')
    this._electronService.ipcRenderer.on('load-success',(event, commitLogJson) => {
      console.log("Received results");
      console.log("Event : " + event);
      console.log("arg" + commitLogJson);
      this.logValue = commitLogJson;
      console.log("*******************************");
    })
    console.log("received response from ipcMain with value " + this.logValue);
  }
  
}
