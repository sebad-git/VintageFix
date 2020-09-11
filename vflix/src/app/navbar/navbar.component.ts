import { Component, OnInit } from '@angular/core';

import { TranslatorService } from '../../services/translator.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private translatorService:TranslatorService ) { }

  public home:string;
  public bestRanked:string;

  ngOnInit(): void {
    try {
      this.translatorService.getTranslator().subscribe((data) => {
        this.home = data["home"];
        this.bestRanked = data["bestRanked"];
      });
    } 
    catch (error) { alert(error); }
  }

}
