import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/pages_content/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/pages_content/nav-bar/nav-bar.component';
import { WeeklyOverviewComponent } from './components/charts/weekly-overview/weekly-overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFeedbackComponent } from './components/forms/form-feedback/form-feedback.component';
import { Sidebar2Component } from './components/pages_content/sidebar2/sidebar2.component';
import { PostagemComponent } from './components/postagens/postagem/postagem.component';
import { PostagemPageComponent } from './components/postagens/postagem-page/postagem-page.component';
import { TagCloudComponent } from 'angular-tag-cloud-module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ColumnGraphTipoRatingComponent } from './components/charts/column-graph-tipo-rating/column-graph-tipo-rating.component';
import { MonthlyOverviewComponent } from './components/charts/monthly-overview/monthly-overview.component';



@NgModule({
  declarations: [
    AppComponent,
    FeedbacksComponent,
    SidebarComponent,
    DashboardComponent,
    NavBarComponent,
    WeeklyOverviewComponent,
    AppComponent,
    FormFeedbackComponent,
    Sidebar2Component,
    PostagemComponent,
    PostagemPageComponent,
    ColumnGraphTipoRatingComponent,
    MonthlyOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TagCloudComponent,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
