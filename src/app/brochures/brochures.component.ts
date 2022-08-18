import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-brochures',
  templateUrl: './brochures.component.html',
  styleUrls: ['./brochures.component.css']
})
export class BrochuresComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }


  openPdf(path: string): void {

    let language: String = this.translate.currentLang;

    window.open(path + "_" + language + ".pdf");
  }
}
