import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {
  faChartPie,
  faChartLine,
  faEnvelope,
  faGear,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  activeLink: string = ''; // Inicialmente definido como vazio

  faChartPie = faChartPie;
  faChartLine = faChartLine;
  faEnvelope = faEnvelope;
  faGear = faGear;
  faRightFromBracket = faRightFromBracket;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

        // Configure o link ativo com base na URL
        if (url.includes('/home')) {
          this.activeLink = 'home';
        } else if (url.includes('/form')) {
          this.activeLink = 'form';
        } else if (url.includes('/feedback')) {
          this.activeLink = 'feedback';
        } else {
          this.activeLink = '';
        }
      }
    });
}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
