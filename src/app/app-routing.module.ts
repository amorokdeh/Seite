import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { BrochuresComponent } from './brochures/brochures.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { VideoInstructionsComponent } from './video-instructions/video-instructions.component';
import { CadComponent } from './cad/cad.component';
import { EnvironmentComponent } from './environment/environment.component';
import { PerformanceTextsComponent } from './performance-texts/performance-texts.component';
import { CEComponent } from './ce/ce.component';
import { CostPlanningComponent } from './cost-planning/cost-planning.component';
import { ReferenceProjectsComponent } from './reference-projects/reference-projects.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuard } from './auth.guard';
import { ReferenceAtikaComponent } from './reference-atika/reference-atika.component';
import { ReferenceSchnellpanelComponent } from './reference-schnellpanel/reference-schnellpanel.component';
import { ReferenceKassetteComponent } from './reference-kassette/reference-kassette.component';
import { ReferenceAnpressschieneComponent } from './reference-anpressschiene/reference-anpressschiene.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'profil', component: ProfilComponent },
  { path: 'list', component: ListComponent},
  { path: 'reg', component: RegComponent},
  { path: 'delete', component: DeleteComponent},
  { path: 'brochures', component: BrochuresComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'video_instructions', component: VideoInstructionsComponent },
  { path: 'cad', component: CadComponent },
  { path: 'environment', component: EnvironmentComponent },
  { path: 'performance_texts', component: PerformanceTextsComponent },
  { path: 'ce', component: CEComponent },
  { path: 'cost_planning', component: CostPlanningComponent },
  { path: 'reference_projects', component: ReferenceProjectsComponent },
  { path: 'reference_projects/reference_Atika', component: ReferenceAtikaComponent},
  { path: 'reference_projects/reference_Quick', component: ReferenceSchnellpanelComponent},
  { path: 'reference_projects/reference_Cassette', component: ReferenceKassetteComponent},
  { path: 'reference_projects/reference_Rail', component: ReferenceAnpressschieneComponent},

  // otherwise redirect to home
 { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
