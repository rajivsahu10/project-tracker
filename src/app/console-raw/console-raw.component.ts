import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { version } from 'punycode';

@Component({
  selector: 'app-console-raw',
  templateUrl: './console-raw.component.html',
  styleUrls: ['./console-raw.component.css']
})
export class ConsoleRawComponent implements OnInit, OnChanges {

  
  @Input('commitLogJson') commitLog : string = "";
  @Input() version = 0;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commitLogJson']) {
      console.log("ConsoleRawComponent:onChanges:"+ changes['commitLogJson']);
      
    }
  }

}
