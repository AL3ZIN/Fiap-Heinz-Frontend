import { Component } from '@angular/core';

import { faChartPie,faChartLine,faEnvelope,faGear,faLeaf,faUserGroup,faBuilding,faMoon,faSun,faRightFromBracket,faIcicles,faUtensils,faToiletPortable} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
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

  toggleTheme() {
    const body = document.body;
    const themeToggler = document.querySelector('.theme-toggler') as HTMLElement;
    const span1 = themeToggler.querySelector('span:nth-child(1)');
    const span2 = themeToggler.querySelector('span:nth-child(2)');
    body.classList.toggle('dark-theme-variables');

    this.isDarkTheme = !this.isDarkTheme;

    if (span1 && span2) {
      span1.classList.toggle('active');
      span2.classList.toggle('active2');
    }
  }
}
