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
  faSortUp
} from '@fortawesome/free-solid-svg-icons';
import { AppService } from 'src/app/app.service';
import { async } from '@angular/core/testing';

import{ faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = false;
  isDarkTheme = false;

  nRatingPositive!: number;
  nRatingNeutral!: number;
  nRatingNegative!: number;
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

  async ngOnInit(): Promise<void> {
    const nFeed = document.getElementById('nfeed');
    const nTipoEnvironment = document.getElementById('nTipoEnvironment');
    const nTipoSocial = document.getElementById('nTipoSocial');
    const nTipoGovernance = document.getElementById('nTipoGovernance');
    const NPS = document.getElementById('NPS');
    const iconNg = document.getElementById('iconNg');
    const iconNt = document.getElementById('iconNt');
    const iconPs = document.getElementById('iconPs');

    const h1 = document.createElement('h1');
    const h2Environment = document.createElement('h2');
    const h2Social = document.createElement('h2');
    const h2Governance = document.createElement('h2');
    const h1NPS = document.createElement('h1');

    const iconRanking1 = document.querySelector("nps1")
    const iconRanking2 = document.querySelector("nps2")
    const iconRanking3 = document.querySelector("nps3")

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


      await this.getNumRatingAsync();
      await this.getPercentRating();
      await this.getRanking();
  }
  
  async getNumRatingAsync(): Promise<void>{
    this.service.getNumRating().subscribe(_data=>{
      console.log(_data)
      this.nRatingPositive = _data[0];
      this.nRatingNeutral = _data[1];
      this.nRatingNegative = _data[2];
    })

  }
  async getPercentRating(): Promise<void>{
    this.service.getProgressBar().subscribe(_data=>{
      console.log(_data)
      this.percentPositive = _data[0];
      this.percentNeutral = _data[1];
      this.percentNegative = _data[2];
    })
  }
  async getRanking(): Promise<void>{
    this.service.getRankingCanal().subscribe(_data=>{
 
  
      console.log(_data)
      this.namePrimary = _data[0][0];
      if (this.namePrimary === 'Facebook') {
        // Para o nps1, alterar as classes dos ícones correspondentes
        const iconRanking1 = document.querySelector("#ranking1 .facebook") as HTMLElement;
        if (iconRanking1) {
          iconRanking1.classList.remove('displayn');
          iconRanking1.classList.add('display');
        }
      } else if (this.namePrimary === 'Twitter') {
        // Para o ranking1, alterar as classes dos ícones correspondentes
        const iconRanking1 = document.querySelector("#ranking1 .twitter") as HTMLElement;
        if (iconRanking1) {
          iconRanking1.classList.remove('displayn');
          iconRanking1.classList.add('display');
        }
      } else if (this.namePrimary === 'Instagram') {
        // Para o ranking1, alterar as classes dos ícones correspondentes
        const iconRanking1 = document.querySelector("#ranking1 .instagram") as HTMLElement;
        if (iconRanking1) {
          iconRanking1.classList.remove('displayn');
          iconRanking1.classList.add('display');
        }
      }
      this.nameSecondary = _data[1][0];
      if (this.nameSecondary === 'Facebook') {
        // Para o nps1, alterar as classes dos ícones correspondentes
        const iconRanking1 = document.querySelector("#ranking2 .facebook") as HTMLElement;
        if (iconRanking1) {
          iconRanking1.classList.remove('displayn');
          iconRanking1.classList.add('display');
        }
      } else if (this.nameSecondary === 'Twitter') {
        // Para o ranking1, alterar as classes dos ícones correspondentes
        const iconRanking1 = document.querySelector("#ranking2 .twitter") as HTMLElement;
        if (iconRanking1) {
          iconRanking1.classList.remove('displayn');
          iconRanking1.classList.add('display');
        }
      } else if (this.nameSecondary === 'Instagram') {
        // Para o ranking1, alterar as classes dos ícones correspondentes
        const iconRanking1 = document.querySelector("#ranking2 .instagram") as HTMLElement;
        if (iconRanking1) {
          iconRanking1.classList.remove('displayn');
          iconRanking1.classList.add('display');
        }
      }
      this.nameTerciary = _data[2][0];
      if (this.nameTerciary === 'Facebook') {
        // Para o nps1, alterar as classes dos ícones correspondentes
        const iconRanking1 = document.querySelector("#ranking3 .facebook") as HTMLElement;
        if (iconRanking1) {
          iconRanking1.classList.remove('displayn');
          iconRanking1.classList.add('display');
        }
      } else if (this.nameTerciary === 'Twitter') {
        // Para o ranking1, alterar as classes dos ícones correspondentes
        const iconRanking1 = document.querySelector("#ranking3 .twitter") as HTMLElement;
        if (iconRanking1) {
          iconRanking1.classList.remove('displayn');
          iconRanking1.classList.add('display');
        }
      } else if (this.nameTerciary === 'Instagram') {
        // Para o ranking1, alterar as classes dos ícones correspondentes
        const iconRanking1 = document.querySelector("#ranking3 .instagram") as HTMLElement;
        if (iconRanking1) {
          iconRanking1.classList.remove('displayn');
          iconRanking1.classList.add('display');
        }
      }
      

      this.dataPrimary = Number(_data[0][1]);
      this.dataSecondary = Number(_data[1][1]);
      this.dataTerciary = Number( _data[2][1]);
    })
  }
}
