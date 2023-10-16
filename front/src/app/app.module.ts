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
import { LineGraphRatingComponent } from './components/charts/line-graph-rating/line-graph-rating.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecentEditorTableComponent } from './components/tables/recent-editor-table/recent-editor-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule} from '@angular/material/progress-bar'
import { FormFeedbackComponent } from './components/forms/form-feedback/form-feedback.component';
import { Sidebar2Component } from './components/pages_content/sidebar2/sidebar2.component';


@NgModule({
  declarations: [
    AppComponent,
    FeedbacksComponent,
    SidebarComponent,
    DashboardComponent,
    NavBarComponent,
    WeeklyOverviewComponent,
    LineGraphRatingComponent,
    RecentEditorTableComponent,
    AppComponent,
    FormFeedbackComponent,
    Sidebar2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
