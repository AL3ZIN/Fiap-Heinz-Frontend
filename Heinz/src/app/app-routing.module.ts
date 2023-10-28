import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormFeedbackComponent } from './components/forms/form-feedback/form-feedback.component';
import { PostagemPageComponent } from './components/postagens/postagem-page/postagem-page.component';
import { PostagemComponent } from './components/postagens/postagem/postagem.component';
import { ColumnGraphTipoRatingComponent } from './components/charts/column-graph-tipo-rating/column-graph-tipo-rating.component';
import { WeeklyOverviewComponent } from './components/charts/weekly-overview/weekly-overview.component';
import { MonthlyOverviewComponent } from './components/charts/monthly-overview/monthly-overview.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent},
  { path: 'form', component: FormFeedbackComponent },
  { path: 'feedback', component: PostagemPageComponent },
  { path: 'feedback/:id/:embed', component: PostagemPageComponent },
  { path: 'postagem', component: PostagemComponent },
  { path: 'graph', component: ColumnGraphTipoRatingComponent },
  { path: 'graphWk', component: WeeklyOverviewComponent },
  { path: 'graphMt', component: MonthlyOverviewComponent},
  { path: 'graphAd', component: ColumnGraphTipoRatingComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
