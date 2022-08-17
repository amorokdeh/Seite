import { Component, OnInit } from '@angular/core';
import { Verwaltung } from '../models/Verwaltung'; 
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { ExchangeService } from '../services/exchange.service';


@Component({
  selector: 'delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  deleteForm;
  loggedIn:string = 'false';
  user: Verwaltung;
  adminBerechtigung:string = 'false';
  errorMes:string = " ";
  
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private data: ExchangeService) {

      this.deleteForm = this.formBuilder.group({
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
  }

  //Methode zu GetUser
  getUser(deleteData) {
    //überprüfen ob ein Feld leer ist
    if(this.isEmpty(deleteData.username[0], "Benutzername")) {
      return;
    }
    this.authService.getUserByUsername(deleteData.username).subscribe((user: Verwaltung) => {
    //Übergabe in einer Variable des Typs User
      if(user != null) {
        if(user.berechtigung == "Admin") {
          this.errorMes = "Admin-Konto darf nicht gelöscht werden!";
          return;
        }
        this.authService.deleteUser(deleteData.username).subscribe(data => {
          this.authService.deleteUserinVerwaltung(deleteData.username).subscribe(data => {
            alert("Mitarbeiter-Konto wurde erfolgreich gelöscht!")
            //Automatische Weiterleitung zu Home
            this.router.navigate(['/'])
          })
        })
      } else {
      //Falls der Login nicht erfolgreich war, wird eine kurze Meldung ausgegeben
      this.errorMes = "Benutzername nicht gefunden!";
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

}


