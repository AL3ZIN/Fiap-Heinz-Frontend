import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/pages_content/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/pages_content/nav-bar/nav-bar.component';
import { WeeklyOverviewComponent } from './components/charts/weekly-overview/weekly-overview.component';
import { LineGraphRatingComponent } from './components/charts/line-graph-rating/line-graph-rating.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FeedbacksComponent,
    SidebarComponent,
    DashboardComponent,
    NavBarComponent,
    WeeklyOverviewComponent,
    LineGraphRatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
