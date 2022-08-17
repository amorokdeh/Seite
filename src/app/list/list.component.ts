import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import sha256 from 'crypto-js/sha256';
import { AuthGuard } from '../auth.guard';
import { Router} from '@angular/router';
import { ExchangeService } from '../services/exchange.service';
import { Verwaltung } from '../models/Verwaltung';


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
  private data: ExchangeService) {

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
    if(this.isEmpty(userData.username[0], "Benutzername")) {
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
        this.errorMes = 'Benutzer nicht gefunden';
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
      this.errorMes = Message + ' Darf nicht leer sein';
      return true;
    } else {
      return false;
    }
  }

}


