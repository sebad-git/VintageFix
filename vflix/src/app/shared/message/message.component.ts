import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() errorMessage: string = undefined;
  @Input() infoMessage: string = undefined;

  constructor() {}

  ngOnInit(): void { this.errorMessage=undefined; this.infoMessage=undefined; }

}
