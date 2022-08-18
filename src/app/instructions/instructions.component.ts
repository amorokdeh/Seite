import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

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
