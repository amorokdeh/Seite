import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuard } from './auth.guard';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { BrochuresComponent } from './brochures/brochures.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { VideoInstructionsComponent } from './video-instructions/video-instructions.component';
import { CadComponent } from './cad/cad.component';
import { EnvironmentComponent } from './environment/environment.component';
import { PerformanceTextsComponent } from './performance-texts/performance-texts.component';
import { CEComponent } from './ce/ce.component';
import { CostPlanningComponent } from './cost-planning/cost-planning.component';
import { ReferenceProjectsComponent } from './reference-projects/reference-projects.component';
import { ImprintFooterComponent } from './imprint-footer/imprint-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    LoginComponent,
    RegComponent,
    DeleteComponent,
    ProfilComponent,
    ListComponent,
    BrochuresComponent,
    InstructionsComponent,
    VideoInstructionsComponent,
    CadComponent,
    EnvironmentComponent,
    PerformanceTextsComponent,
    CEComponent,
    CostPlanningComponent,
    ReferenceProjectsComponent,
    ImprintFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
      }
  })
  
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
