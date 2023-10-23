import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Contador, ContadorTipo } from 'src/app/models/contador';

import {
  faChartPie,
  faChartLine,
  faEnvelope,
  faGear,
  faLeaf,
  faUserGroup,
  faBuilding,
  faMoon,
  faSun,
  faRightFromBracket,
  faIcicles,
  faUtensils,
  faToiletPortable,
  faFaceMeh,
  faFaceAngry,
  faFaceSmile,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { AppService } from 'src/app/app.service';
import { async } from '@angular/core/testing';

import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = false;
  isDarkTheme = false;

  ntotalFeedbacks!: number;

  contador!: Contador;
  nRatingNeutral!: number;
  nRatingNegative!: number;
  nRatingPositive!: number;

  nTipoEnvironment!: number;
  nTipoSocial!: number;
  nTipoGovernance!: number;

  percentPositive!: number;
  percentNeutral!: number;
  percentNegative!: number;

  namePrimary!: string;
  nameSecondary!: string;
  nameTerciary!: string;

  dataPrimary!: number;
  dataSecondary!: number;
  dataTerciary!: number;

  faChartPie = faChartPie;
  faChartLine = faChartLine;
  faEnvelope = faEnvelope;
  faGear = faGear;
  faLeaf = faLeaf;
  faUserGroup = faUserGroup;
  faBuilding = faBuilding;
  faMoon = faMoon;
  faSun = faSun;
  faRightFromBracket = faRightFromBracket;
  faIcicles = faIcicles;
  faUtensils = faUtensils;
  faToiletPortable = faToiletPortable;
  faFaceMeh = faFaceMeh;
  faFaceAngry = faFaceAngry;
  faFaceSmile = faFaceSmile;
  faSortUp = faSortUp;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;

  constructor(private service: AppService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleTheme() {
    const body = document.body;
    const themeToggler = document.querySelector(
      '.theme-toggler'
    ) as HTMLElement;
    const span1 = themeToggler.querySelector('span:nth-child(1)');
    const span2 = themeToggler.querySelector('span:nth-child(2)');
    body.classList.toggle('dark-theme-variables');

    this.isDarkTheme = !this.isDarkTheme;

    if (span1 && span2) {
      span1.classList.toggle('active');
      span2.classList.toggle('active');
    }
  }

  async ngOnInit(): Promise<void> {

    const NPS = document.getElementById('NPS');
    const iconNg = document.getElementById('iconNg');
    const iconNt = document.getElementById('iconNt');
    const iconPs = document.getElementById('iconPs');

    const iconRanking1 = document.querySelector('nps1');
    const iconRanking2 = document.querySelector('nps2');
    const iconRanking3 = document.querySelector('nps3');

    // Numero Total de feedbacks

    await this.service.contador().subscribe((resultData: Contador) => {
      this.contador = resultData;
      iconNps(this.contador.nps);
    });
    
    function iconNps(nps: number) {
      if (nps >= 70) {
        iconPs?.classList.remove('displayn');
      } else if (nps >= 50 && nps < 70) {
        iconNt?.classList.remove('displayn');
      } else {
        iconNg?.classList.remove('displayn');
      }
    }

  }

}

    