import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {

  constructor( private translate: TranslateService) { }

  ngOnInit(): void {
  }

  openFile(path: string): void {

    let language: String = this.translate.currentLang;

    window.open(path);
    
  }

}
