import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';

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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = false;
  isDarkTheme = false;

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

  constructor(private service:AppService) {}

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

  ngOnInit(): void {
    const nFeed = document.getElementById('nfeed');
    const nTipoEnvironment = document.getElementById('nTipoEnvironment');
    const nTipoSocial = document.getElementById('nTipoSocial');
    const nTipoGovernance = document.getElementById('nTipoGovernance');
    const nRatingPositive = document.getElementById('nRatingPositive');
    const nRatingNeutral = document.getElementById('nRatingNeutral');
    const nRatingNegative = document.getElementById('nRatingNegative');
    const NPS = document.getElementById('NPS');
    const iconNg = document.getElementById('iconNg');
    const iconNt = document.getElementById('iconNt');
    const iconPs = document.getElementById('iconPs');

    const h1 = document.createElement('h1');
    const h2Environment = document.createElement('h2');
    const h2Social = document.createElement('h2');
    const h2Governance = document.createElement('h2');
    const pPositive = document.createElement('p');
    const pNeutral = document.createElement('p');
    const pNegative = document.createElement('p');
    const h1NPS = document.createElement('h1');

    // Numero Total de feedbacks

      this.service.getTotalFeedbacks().subscribe((resultData: any) => {
        console.log(resultData);
        h1.textContent = resultData;
        nFeed?.appendChild(h1);
      });

    // Numero de Feedbacks Environment
  
      this.service.getNumTipoEnvironment().subscribe((resultData: any) => {
        console.log(resultData);
        h2Environment.textContent = resultData;
        nTipoEnvironment?.appendChild(h2Environment);
      });

    // Numero de Feedbacks Social
      this.service.getNumTipoSocial().subscribe((resultData: any)=>{
      console.log(resultData);
      h2Social.textContent = resultData;
      nTipoSocial?.appendChild(h2Social)});

    // Numero de Feedbacks Governance
   
      this.service.getNumTipoGovernance().subscribe((resultData: any) => {
        console.log(resultData);
        h2Governance.textContent = resultData;
        nTipoGovernance?.appendChild(h2Governance);
      });


      this.service.getNumRatingPositive().subscribe((resultData: any) => {
        console.log(resultData);
        pPositive.textContent = resultData;
        nRatingPositive?.appendChild(pPositive);
      });

      this.service.getNumRatingNeutral().subscribe((resultData: any) => {
        console.log(resultData);
        pNeutral.textContent = resultData;
        nRatingNeutral?.appendChild(pNeutral);
      });

      this.service.getNumRatingNegative().subscribe((resultData: any) => {
        console.log(resultData);
        pNegative.textContent = resultData;
        nRatingNegative?.appendChild(pNegative);
      });

    // Nota NPS
    
      this.service.getNotaNPS().subscribe((resultData: any) => {
        console.log(resultData);
        h1NPS.textContent = resultData;
        if (resultData < 50) {
          iconNg?.classList.remove('displayn');
          iconNg?.classList.add('display');
          NPS?.classList.add("danger")
        } else if (resultData > 50 && resultData <= 70) {
          iconNt?.classList.remove('displayn');
          iconNt?.classList.add('display');
          NPS?.classList.add("warning")
        } else if (resultData > 70) {
          iconPs?.classList.remove('displayn');
          iconPs?.classList.add('display');
          NPS?.classList.add("success")
        }
        NPS?.appendChild(h1NPS);
      });
  }
}
