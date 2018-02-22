import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: 'user-profile', title: 'User Profile',  icon:'person', class: '' },
  //  { path: 'table-list', title: 'Table List',  icon:'content_paste', class: '' },
   // { path: 'typography', title: 'Typography',  icon:'library_books', class: '' },
   // { path: 'icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  // { path: 'maps', title: 'Maps',  icon:'location_on', class: '' },
  //  { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
  //  { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
 { path: 'home', title: 'Home',  icon: 'dashboard', class: '' },
 { path: 'alunos', title: 'Alunos', icon: 'school', class: '' },
 { path: 'artigos', title: 'Artigos', icon: 'folder_special', class: '' },
 { path: 'cursos', title: 'Cursos', icon: 'library_books', class: '' },
 { path: 'videoaulas', title: 'Videoaulas', icon: 'play_circle_filled',class: '' },
 { path: 'podcasts', title: 'Podcasts', icon: 'audiotrack', class:'' },
 { path: 'casos-clinicos', title: 'Casos Clínicos', icon: 'folder_shared', class: '' },
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
