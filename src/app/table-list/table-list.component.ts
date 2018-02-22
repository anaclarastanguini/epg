import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  variavel: FirebaseListObservable<any[]>;

  constructor(public afDB: AngularFireDatabase) { 
    //Exibir lista de contatos
    //this.variavel = this.afDB.list('/XXX');
  }

  ngOnInit() {
  }

}
