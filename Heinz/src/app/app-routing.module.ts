import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormFeedbackComponent } from './components/forms/form-feedback/form-feedback.component';
import { PostagemPageComponent } from './components/postagens/postagem-page/postagem-page.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent},
  { path: 'form', component: FormFeedbackComponent },
  { path: 'feedback/:id/:embed', component: PostagemPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
