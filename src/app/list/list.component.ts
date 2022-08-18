import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import sha256 from 'crypto-js/sha256';
import { AuthGuard } from '../auth.guard';
import { Router} from '@angular/router';
import { ExchangeService } from '../services/exchange.service';
import { Verwaltung } from '../models/Verwaltung';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listForm;

  loggedIn:string = 'false';
  user: Verwaltung;
  allUsers: Verwaltung[];
  adminBerechtigung:string = 'false';
  search:string = "false";
  errorMes:string = " ";

  constructor(private authService: AuthService,
  private formBuilder: FormBuilder,
  private auth: AuthGuard,
  private data: ExchangeService,
  private translate: TranslateService) {

      this.listForm = this.formBuilder.group({
        
      username: ''
    })
  }

  ngOnInit(): void {
    this.errorMes = " ";
    this.data.currentMessageSwitch.subscribe(message => this.loggedIn = message);
    if(this.loggedIn === 'true') {
      this.user = this.data.getUser()
      if(this.user.berechtigung == "Admin") {
        this.adminBerechtigung = 'true';
      }
    }
    if(this.search == "false"){
      this.getAllUsers();
    } 
  }

  getUser(userData){
    //überprüfen ob ein Feld leer ist
    if(this.isEmpty(userData.username[0], this.translate.instant('login.username'))) {
      return;
    }
    this.authService.getUserByUsername(userData.username).subscribe((user: Verwaltung) => {
      if(user != null) {
        this.user = user;
        this.search = "true";
        this.allUsers.length = 0;
        this.allUsers.push(this.user);
        this.errorMes = " ";
      } else{
        this.errorMes = this.translate.instant('error.unknown_user');
      }
    })
  }

  getAllUsers() {
    this.search = "false"
    this.errorMes = " ";
    this.authService.getAllUsers().subscribe((users: Verwaltung[]) =>{
      this.allUsers = users;
    })
  }

  isEmpty(str, Message) : boolean{
    if(!str || str.length === 0){
      this.errorMes = Message + this.translate.instant('error.field_empty');
      return true;
    } else {
      return false;
    }
  }

}


