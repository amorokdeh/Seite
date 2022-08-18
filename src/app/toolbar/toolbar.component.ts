import { Component, OnInit, VERSION,ViewChild, ElementRef} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../auth.guard';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { ExchangeService } from '../services/exchange.service';
import { Verwaltung } from '../models/Verwaltung';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  private permission;
  buttonInOut:string = "Login";
  loggedIn: string = 'false';
  user: Verwaltung;
  name = 'Angular ' + VERSION.major;
  @ViewChild("myNameElem1") myNameElem1: ElementRef;
  @ViewChild("myNameElem2") myNameElem2: ElementRef;

  constructor(private app: AppComponent,
              private auth: AuthGuard,
              private data: ExchangeService,
              private router: Router,) { }
  
  ngOnInit(): void {
    this.data.currentMessageLogin.subscribe(message => this.buttonInOut = message);
    this.data.currentMessageSwitch.subscribe(message => this.loggedIn = message);
  }

  //Methode die überprüft, ob ein Nutzer eingeloggt ist. Falls nicht, wird ein Alert ausgerufen
  getPermission(){
    this.permission = this.auth.canActivate(); 
    if (this.permission === 'false') {
      alert("Du musst dich zuerst anmelden, um auf diesen Bereich zugreifen zu können")
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.changePermissionFalse();
    this.data.switchFunctions
    this.loggedIn = 'false';
    this.buttonInOut = 'Login';
    this.data.setUser(null);
    window.localStorage.removeItem('user');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  userEingelogt(): boolean {
    if(this.loggedIn === 'true') {
      this.user = this.data.getUser()
      //this.name = this.user.benutzername;
      return true;
    }
    return false;
  }

  setLanguage(language: string): void {

    this.app.useLanguage(language);
  }

  search1(): void{ this.search(this.myNameElem1.nativeElement.value) }
  search2(): void{ this.search(this.myNameElem2.nativeElement.value) }

  search(query:String): void {
    console.log('query: ' + query);

    query = query.toUpperCase();
    switch(query){
      default:
        this.router.navigate(['']);
        break;
      case 'PROSPEKTE':
      case 'BROCHURES':
      case 'BROSZUR':
        this.router.navigate(['brochures']);
        break;

      case 'ANLEITUNGEN':
      case 'INSTRUCTIONS':
      case 'COSIGNES':
      case 'INSTRUKCJE':
        this.router.navigate(['instructions'])
        break;

      case 'VIDEOANLEITUNGEN':
      case 'VIDEO INSTRUCTIONS':
      case 'INSTRUCTIONS VIDÉO':
      case 'INSTRUKCJE WIDEO':
        this.router.navigate(['video_instructions'])
        break;

      case 'CAD':
      case 'CADS':
      case 'CAO':
      case 'BLUEPRINTS':
      case 'CAD BLUEPRINTS':
      case 'RYSUNKI':
      case 'RYSUNKI CAD':
      case 'DESSIN':
      case 'DESSIN CAO':
        this.router.navigate(['cad'])
        break;

      case 'UMWELT':
      case 'NACHHALTIGKEIT':
      case 'ENVIRONMENT':
      case 'SUSTAINABILITY':
      case 'ENVIRONNEMENT':
      case 'DURABILITÉ':
      case 'ŚRODOWISKO':
        this.router.navigate(['environment'])
        break;

      case 'LV':
      case 'LEISTUNGSTEXTE':
      case 'PERFORMANCE TEXTS':
      case 'TEXTES DE PERFORMANCES':
      case 'TEKSTY O WYDAJNOŚCI':
        this.router.navigate(['performance_texts'])
        break;

      case 'CE':
      case 'CE ERKLÄRUNG':
      case 'PATENTE':
      case 'CE DECLARATION':
      case 'PATENTS':
      case 'BREVETS':
      case 'DECLARATION CE':
      case 'DEKLARACJA CE':
      case 'PATENTY':
        this.router.navigate(['ce'])
        break;

      case 'KOSTENPLANUNG':
      case 'KOSTEN':
      case 'COST PLANNING':
      case 'COSTS':
      case 'PLANIFICATION DES COÛTS':
      case 'PLANIFICATION DES COUTS':
      case 'COUTS':
      case 'COÛTS':
      case 'PLANOWANIE KOSZTÓW':
      case 'PLANOWANIE KOSZTOW':
      case 'KOSZTÓW':
      case 'KOSZTOW':
        this.router.navigate(['cost_planning'])
        break;

      case 'REFERENZPROJEKTE':
      case 'REFERENZEN':
      case 'REFERENCE PROJECTS':
      case 'REFERENCES':
      case 'PROJETS DE REFERENCE':
      case 'RÉFÉRENCES':
      case 'PROJEKTY REFERENCYJNE':
      case 'REFERENCYJNE':

        this.router.navigate(['reference_projects'])
        break;


      }
    }
  
}

