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
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css'],
})
export class Sidebar2Component implements OnInit {
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
        const url = event.urlAfterRedirects; // Obtenha a URL da rota ativa

        // Configure o link ativo com base na URL
        if (url === '/home') {
          this.activeLink = 'dashboard';
        } else if (url === '/form') {
          this.activeLink = 'analytics';
        } else {
          this.activeLink = ''; // Defina o link ativo como vazio para outras rotas
        }
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
