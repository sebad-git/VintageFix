import { Component, OnInit } from '@angular/core';

import { TranslatorService } from '../../shared/services/translator.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private translatorService:TranslatorService ) { }

  public home:string;
  public contact:string;

  ngOnInit(): void {
    try {
      this.translatorService.getTranslator().subscribe((data) => {
        this.home = data["home"];
        this.contact = data["contact"];
      });
    } 
    catch (error) { alert(error); }
  }

}
