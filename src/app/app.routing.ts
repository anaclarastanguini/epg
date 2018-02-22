import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

//import { UserProfileComponent } from './user-profile/user-profile.component';
//import { TableListComponent } from './table-list/table-list.component';
//import { TypographyComponent } from './typography/typography.component';
//import { IconsComponent } from './icons/icons.component';
//import { MapsComponent } from './maps/maps.component';
//import { NotificationsComponent } from './notifications/notifications.component';
//import { UpgradeComponent } from './upgrade/upgrade.component';
import { HomeComponent } from './home/home.component';
import { AlunosComponent } from './alunos/alunos.component';
import { ArtigosComponent }from './artigos/artigos.component';
import { CursosComponent } from './cursos/cursos.component';
import { VideoaulasComponent } from './videoaulas/videoaulas.component';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { CasosClinicosComponent } from './casos-clinicos/casos-clinicos.component';


const routes: Routes =[
//    { path: 'user-profile',   component: UserProfileComponent },
//    { path: 'table-list',     component: TableListComponent },
//    { path: 'typography',     component: TypographyComponent },
//    { path: 'icons',          component: IconsComponent },
//    { path: 'maps',           component: MapsComponent },
//    { path: 'notifications',  component: NotificationsComponent },
//    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'home',           component: HomeComponent },
    { path: 'alunos',         component: AlunosComponent },
    { path: 'artigos',        component: ArtigosComponent },
    { path: 'cursos',         component: CursosComponent },
    { path: 'videoaulas',     component: VideoaulasComponent },
    { path: 'podcasts',       component: PodcastsComponent },
    { path: 'casos-clinicos', component: CasosClinicosComponent },

    { path: '',               redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
