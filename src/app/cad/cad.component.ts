import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cad',
  templateUrl: './cad.component.html',
  styleUrls: ['./cad.component.css']
})
export class CadComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  openPdf(path: string, translate: boolean): void {

    let language: String = this.translate.currentLang;


    if (translate == true){
      window.open(path + "_" + language + ".pdf");
    }
    else {
      window.open(path + ".pdf");
    }
    
  }

}
