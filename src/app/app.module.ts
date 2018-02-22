import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

//import { UserProfileComponent } from './user-profile/user-profile.component';
//import { TableListComponent } from './table-list/table-list.component';
//import { TypographyComponent } from './typography/typography.component';
//import { IconsComponent } from './icons/icons.component';
//import { MapsComponent } from './maps/maps.component';
//import { NotificationsComponent } from './notifications/notifications.component';
//import { UpgradeComponent } from './upgrade/upgrade.component';
import { HomeComponent } from './home/home.component';
import { AlunosComponent } from './alunos/alunos.component';
import { ArtigosComponent } from './artigos/artigos.component';
import { CursosComponent } from './cursos/cursos.component';
import { UploadFileService } from './providers/upload';
import { VideoaulasComponent } from './videoaulas/videoaulas.component';
import { ServicoVideo } from './providers/videos';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { ServicoAudio } from './providers/audios';
import { CasosClinicosComponent } from './casos-clinicos/casos-clinicos.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyBt-zC8jSppxsxo6nDU0mFJWYc_SWkpHtQ",
  authDomain: "webepg-43223.firebaseapp.com",
  databaseURL: "https://webepg-43223.firebaseio.com",
  projectId: "webepg-43223",
  storageBucket: "webepg-43223.appspot.com",
  messagingSenderId: "406864022373"
  };

@NgModule({
  declarations: [
    AppComponent,
    //UserProfileComponent,
    //TableListComponent,
    //TypographyComponent,
    //IconsComponent,
    //MapsComponent,
   //NotificationsComponent,
    //UpgradeComponent,
    HomeComponent,
    AlunosComponent,
    ArtigosComponent,
    CursosComponent,
    VideoaulasComponent,
    PodcastsComponent,
    CasosClinicosComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule

  ],
  providers: [
    UploadFileService,
    ServicoVideo,
    ServicoAudio,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
