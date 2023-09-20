import { Component } from '@angular/core';

import { faChartPie,faChartLine,faEnvelope,faGear,faLeaf,faUserGroup,faBuilding,faMoon,faSun,faRightFromBracket,faIcicles,faUtensils,faToiletPortable} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarOpen = false;

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
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
