import { Component } from '@angular/core';

import { faChartPie,faChartLine,faEnvelope,faGear,faLeaf,faUserGroup,faBuilding,faMoon,faSun,faRightFromBracket,faIcicles,faUtensils,faToiletPortable,faFaceMeh,faFaceAngry,faFaceSmile,
faSortUp} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleTheme() {
    const body = document.body;
    const themeToggler = document.querySelector('.theme-toggler') as HTMLElement;
    const span1 = themeToggler.querySelector('span:nth-child(1)');
    const span2 = themeToggler.querySelector('span:nth-child(2)');
    body.classList.toggle('dark-theme-variables');

    this.isDarkTheme = !this.isDarkTheme;

    if (span1 && span2) {
      span1.classList.toggle('active');
      span2.classList.toggle('active');
    }
  }
}
