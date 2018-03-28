import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { version } from 'punycode';

@Component({
  selector: 'app-console-raw',
  templateUrl: './console-raw.component.html',
  styleUrls: ['./console-raw.component.css']
})
export class ConsoleRawComponent implements OnInit, OnChanges, DoCheck {

  
  @Input('commitLogJson') commitLog : string = "";
  @Input() version = 0;
  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {
    console.log("called console-raw-component:ngDoCheck()")
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commitLogJson']) {
      console.log("ConsoleRawComponent:onChanges:"+ changes['commitLogJson']);
      
    }
  }

}
