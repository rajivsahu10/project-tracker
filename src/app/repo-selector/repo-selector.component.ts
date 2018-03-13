import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ElectronService } from "ngx-electron";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
@Component({
  selector: 'app-repo-selector',
  templateUrl: './repo-selector.component.html',
  styleUrls: ['./repo-selector.component.css']
})
export class RepoSelectorComponent implements OnInit {
  // @Output() logDataReceived = new EventEmitter<string>();
  data: string = "No Data";
  @Output() logDataReceived = new BehaviorSubject<string>(this.data);
  constructor(private _electronService: ElectronService) { }
  
  ngOnInit() {
    this._electronService.ipcRenderer.on('load-success',(event, commitLogJson) => {
      console.log("received response in ipcRenderer ");
      console.log("Event : " + event);
      //console.log("arg" + commitLogJson);
      this.publishMyEvent(commitLogJson);
      console.log("*******************************");
      console.log("RepoSelectorComponent:this["+this+"]");
    });
  }

  publishMyEvent(log:string){
    this.data = log;
    this.logDataReceived.next(log);
  }

  displayData() {
    this.logDataReceived.next(this.data);
  }

  clearData(): void {    
    this.logDataReceived.next("");
  }

  public loadData(): void {
    console.log("Load button clicked");
    console.log("sending request to ipcMain now ..");
    this._electronService.ipcRenderer.send('load-async')  
  }
}
