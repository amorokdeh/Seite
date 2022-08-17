import { Component, OnInit} from '@angular/core';
import { Verwaltung } from '../models/Verwaltung';
import { ExchangeService } from '../services/exchange.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Hamburger Downloadcenter';
  loggedIn:string = 'false';
  user: Verwaltung;
  adminBerechtigung:string = 'false';
  constructor(private data: ExchangeService) {}

  ngOnInit(): void {
    this.data.currentMessageSwitch.subscribe(message => this.loggedIn = message);
    if(this.loggedIn === 'true') {
      this.user = this.data.getUser()
      if(this.user.berechtigung == "Admin") {
        this.adminBerechtigung = 'true';
      }
    }
  }

}
