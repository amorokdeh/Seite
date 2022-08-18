import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-performance-texts',
  templateUrl: './performance-texts.component.html',
  styleUrls: ['./performance-texts.component.css']
})
export class PerformanceTextsComponent implements OnInit {

  constructor( private translate: TranslateService) { }

  ngOnInit(): void {
  }


  openFile(path: string): void {

    let language: String = this.translate.currentLang;


    window.open(path);
    
  }
}
