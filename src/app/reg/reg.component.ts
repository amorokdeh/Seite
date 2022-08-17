import { Component, OnInit } from '@angular/core';
import { Verwaltung } from '../models/Verwaltung';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import sha256 from 'crypto-js/sha256';
import { Router} from '@angular/router';
import { ExchangeService } from '../services/exchange.service';


@Component({
  selector: 'reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {

  registrationForm;
  newUser: Observable<any>;
  secretKey = "u9bxzswZGCe8p5BtlxTYJtes2OaKPr2Q"
  encPassword;
  decPassword;
  loggedIn:string = 'false';
  user: Verwaltung;
  adminBerechtigung:string = 'false';
  errorMes:string = " ";
  
  
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private data: ExchangeService) {

      this.registrationForm = this.formBuilder.group({
        
        username: ['', [Validators.required]],
        passwort: ['', [Validators.required]]
    })
  }

  get username(){
    return this.registrationForm.get('username')
  };

  get passwort(){
    return this.registrationForm.get('passwort')
  };

  public encryptPassword(password:string) {
    this.encPassword = sha256(password, this.secretKey).toString();
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
  }

  //Methode zum Reg einer Mitarbeiter
  register(registerDaten) {
    //überprüfen ob ein Feld leer ist
    if(this.isEmpty(registerDaten.username[0], "Benutzername") || 
       this.isEmpty(registerDaten.passwort[0], "Passwort")) {
      return;
    }
    this.encryptPassword(registerDaten.passwort);
    //Überprüft ob Benutzername bereits existiert.
    this.authService.getUserByUsername(registerDaten.username).subscribe((user: Verwaltung) => {
      if(user == null) {
        this.newUser = this.authService.register(registerDaten.username, this.encPassword);
        this.newUser.subscribe(data => {
          this.authService.registerInVerwaltung(registerDaten.username).subscribe(data => {
            alert('Erfolgreich registriert!')
            this.router.navigate(['/']);
          })
    })
      } else {
        this.errorMes = "Benutzername existiert bereits"
      }
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


