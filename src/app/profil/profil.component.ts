import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import sha256 from 'crypto-js/sha256';
import { AuthGuard } from '../auth.guard';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ExchangeService } from '../services/exchange.service';
import { Observable } from 'rxjs';
import { Verwaltung } from '../models/Verwaltung';


@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  profilForm;
  loggedIn:string = 'false';
  secretKey = "u9bxzswZGCe8p5BtlxTYJtes2OaKPr2Q"
  encPassword;
  userCheck: User;
  user: Verwaltung;
  newUser: Observable<any>;
  errorMes:string = " ";
  
  constructor(private authService: AuthService,
  private formBuilder: FormBuilder,
  private auth: AuthGuard,
  private router: Router,
  private data: ExchangeService) {

      this.profilForm = this.formBuilder.group({
        
      username: '',
      passwort: '',
      oldPassword: ''
    })
  }

  ngOnInit(): void {
    this.errorMes = " ";
    this.data.currentMessageSwitch.subscribe(message => this.loggedIn = message);
    if(this.loggedIn === 'true') {
      this.user = this.data.getUser()
    }
    
  }

  //Methode zum einloggen
  changeUser(profilData) {
    //überprüfen ob ein Feld leer ist
    if(this.isEmpty(profilData.username[0], "Neuer Benutzername") || 
       this.isEmpty(profilData.passwort[0], "Neues Passwort") ||
       this.isEmpty(profilData.oldPassword[0], "Aktuelles Passwort")) {
      return;
    }

    //check ob passwort richtig
    this.encPassword = sha256(profilData.oldPassword, this.secretKey).toString();
    this.authService.getUser(this.user.benutzername.toString(), this.encPassword).subscribe((user: User) => {
      //Übergabe in einer Variable des Typs User
      this.userCheck = user
      //Wenn user nicht null, dann war Loginprozess erfolgreich
        if(user != null) {

          //change profile
          //Verschlüsselt das eingegebene Passwort mit SHA256
          this.encPassword = sha256(profilData.passwort, this.secretKey).toString();
          //Überprüfen ob Benutzer existiert
          this.authService.getUserByUsername(profilData.username).subscribe((checkUser: Verwaltung) => {
            if(checkUser == null) {
              this.newUser = this.authService.changeUser(profilData.username, this.encPassword, this.user.benutzername);
              this.newUser.subscribe(data => {
                this.authService.changeVerwaltung(profilData.username, this.user.benutzername.toString()).subscribe(data => {
                  alert('Profil wurde erfolgreich geändert!');
                  //Automatische Weiterleitung zu home
                  this.logout();
                })
              });
            } else{
              this.errorMes = "Benutzername existiert bereits";
            }
          });
        } else {
        //Falls der Login nicht erfolgreich war, wird eine kurze Meldung ausgegeben
        this.errorMes = "Das hat leider nicht geklappt!, Aktuelles Passwort ist falsch";
          return;
        }
      });

  }


  isEmpty(str, Message) : boolean{
    if(!str || str.length === 0){
      this.errorMes = Message + ' Darf nicht leer sein';
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.auth.changePermissionFalse();
    this.data.switchFunctions
    this.loggedIn = 'false';
    this.data.setUser(null);
    window.localStorage.removeItem('user');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}


