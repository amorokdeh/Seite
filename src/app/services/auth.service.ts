import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { User } from '../models/User';
import { Verwaltung } from '../models/Verwaltung';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Hier werden die Adressen, der funktionen in der Server.js gespeichert
  private userUrl : string = 'http://localhost:8080/api/userlist';
  private changeUserUrl : string = 'http://localhost:8080/api/changeUser';
  private changeVerwaltungrUrl : string = 'http://localhost:8080/api/changeVerwaltung';
  private registerUrl : string = 'http://localhost:8080/api/register';
  private regVerwaltungUrl : string = 'http://localhost:8080/api/regVerwaltung';
  private deleteUserUrl : string = 'http://localhost:8080/api/deleteUser';
  private deleteUserInVerwaltungUrl : string = 'http://localhost:8080/api/deleteUserInVerwaltung';
  private allUsersUrl : string = 'http://localhost:8080/api/allUsers';

  user: Observable<any>;
  Verwaltung: Observable<any>;


  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

  // Dies ist die Funktion, die den Username und das Passwort von dem 
  // Frontend bekommt und diese mit der userUrl an den Server sendet.
  // Anschließend wir ein User Objekt als antwort erwartet.
  getUser(username: string, passwort: string): Observable<User>{
    this.user = this.http.get<User>(this.userUrl + "/" + username + "/" + passwort);
    return this.user;

  }

  changeUser(username: string, passwort: string, oldUsername: String): Observable<any>{
    return this.http.put<any>(this.changeUserUrl, {
      "username" : username,
      "passwort" : passwort,
      "oldUsername" : oldUsername
    });
  }

  changeVerwaltung(username: string, oldUsername: String) {
    return this.http.put<any>(this.changeVerwaltungrUrl, {
      "username" : username,
      "oldUsername" : oldUsername
    });
  }

  // Diese Funktion bekommt den username, vom 
  // Frontend, welcher als Variable mit der userUrl an den Server gesendet wird.
  // Anschließend wir ein User Objekt, mit dem username den wir and den server geschickt
  //haben, als antwort erwartet.
  getUserByUsername(username: string): Observable<Verwaltung>{
    this.Verwaltung = this.http.get<Verwaltung>(this.userUrl + "/" + username );
    return this.Verwaltung;
  }

  // Dies ist die Funktion, die die Variablen fuer die Registrierung von dem
  // Frontend bekommt und diese als jason Objekt mit der registerUrl an den Server sendet.
  // Anschließend wir etwas von Typ any als antwort erwartet.
  register(username: string, passwort: string): Observable<any>{
    
    return this.http.post<any>(this.registerUrl, {
      "username" : username, 
      "passwort" : passwort
    });
  }

  registerInVerwaltung(username: string): Observable<any>{
    
    return this.http.post<any>(this.regVerwaltungUrl, {
      "username" : username, 
    });
  }

  deleteUser(username: string): Observable<any>{
    
    return this.http.put<any>(this.deleteUserUrl, {
      "username" : username, 
    });
  }

  deleteUserinVerwaltung(username: string): Observable<any>{
    
    return this.http.put<any>(this.deleteUserInVerwaltungUrl, {
      "username" : username, 
    });
  }

  getAllUsers(): Observable<Verwaltung[]>{
    this.Verwaltung = this.http.get<Verwaltung[]>(this.allUsersUrl);
    return this.Verwaltung;
  }

}
