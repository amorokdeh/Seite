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
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;
  secretKey = "u9bxzswZGCe8p5BtlxTYJtes2OaKPr2Q"
  encPassword;
  userCheck: User;
  adminBerechtigung:string = 'false';
  errorMes:string = " ";
  interval;
  
  constructor(private authService: AuthService,
  private formBuilder: FormBuilder,
  private auth: AuthGuard,
  private router: Router,
  private data: ExchangeService,
  private translate: TranslateService) {

      this.loginForm = this.formBuilder.group({
        
      username: '',
      passwort: ''
    })
  }
  ngOnInit(): void {
    this.errorMes = " ";
  }

  //Methode zum einloggen
  getUser(loginData) {
    //überprüfen ob ein Feld leer ist
    if(this.isEmpty(loginData.username[0], this.translate.instant('login.username')) || 
       this.isEmpty(loginData.passwort[0], this.translate.instant('login.password'))) {
      return;
    }
    //Verschlüsselt das eingegebene Passwort mit SHA256
    this.encPassword = sha256(loginData.passwort, this.secretKey).toString();
    //Get-Methode um entsprechenden User aus der Datenbank zu ziehen
    this.authService.getUser(loginData.username, this.encPassword).subscribe((user: User) => {
    //Übergabe in einer Variable des Typs User
    this.userCheck = user
    //Wenn user nicht null, dann war Loginprozess erfolgreich
      if(user != null) {
        //this.changePermissionTrue();
        //this.permission = this.auth.canActivate();
        //Automatische Weiterleitung zu Home
        this.router.navigate(['/']).then(() => {
          this.interval = setInterval(() => {
            window.location.reload();
         }, 500);
        });
        //Loginbutton wird geswitched
        this.switchButtonMessage();
        this.switchFunctionsReserv();
        //set user
        this.authService.getUserByUsername(loginData.username).subscribe((user: Verwaltung) => {
          if(user.berechtigung == "Admin") {
            this.adminBerechtigung = 'true';
          }
          this.data.setUser(user);
        })
      } else {
      //Falls der Login nicht erfolgreich war, wird eine kurze Meldung ausgegeben
      this.errorMes = this.translate.instant('error.login_failed');
      }
    });
  }

  //Setzt den Text im Loginbutton auf Logout, wenn user sich erfolgreich angemeldet hat
  switchButtonMessage() {
    this.data.changeLogin('Logout');
  }
  //Wechselt die Funktion des Login Buttons auf die Funktion des Logout Buttons
  switchFunctionsReserv() {
    this.data.switchFunctions('true');
  }
  //Setzt die Variable in auth.guard.ts auf "true"
  changePermissionTrue() {
    this.auth.changePermissionTrue();
  }
  //Setzt die Variable in auth.guard.ts auf "false"
  changePermissionFalse() {
    this.auth.changePermissionFalse();
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


