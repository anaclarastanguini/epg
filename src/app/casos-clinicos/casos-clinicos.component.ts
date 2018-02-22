import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-casos-clinicos',
  templateUrl: './casos-clinicos.component.html',
  styleUrls: ['./casos-clinicos.component.css']
})
export class CasosClinicosComponent implements OnInit {

  //Variáveis
  casos: FirebaseListObservable<any[]>;
  titulo;
  caso;
  sucesso: boolean = false;
  erro: boolean = false;
  cadastrarbtn: boolean = true;
  editarbtn: boolean = false;
  sucesso2: boolean = false;
  sucesso3: boolean = false;
  key;

  constructor(public afDB: AngularFireDatabase) { 
    
    //Listar artigos no banco de dados
    this.casos = this.afDB.list('/CasosClinicos');
  }

  ngOnInit() { }

  //Função de cadastrar artigos+exibir alerta de sucesso/erro
  cadastrar() {
    if ((this.caso != undefined) && (this.caso != "") &&
      (this.titulo != undefined) && (this.titulo != "")) {
      this.afDB.list('/CasosClinicos').push({
        caso: this.caso,
        titulo: this.titulo,

      })
        .then(() => {
          this.sucesso = true
          setTimeout(() => {
            this.sucesso = false
          }, 2000)
          this.caso = "";
          this.titulo = "";
          })
        .catch(() => {
          this.erro = true
          setTimeout(() => {
            this.erro = false
          }, 2000)
        })
    }

    else {
      this.erro = true
      setTimeout(() => {
        this.erro = false
      }, 2000)
    }
  }

  //Função de editar artigos
  editar(caso) {
    this.caso = caso.caso;
    this.titulo = caso.titulo;
    this.editarbtn = true;
    this.cadastrarbtn = false;
    this.key = caso.$key;
    let input = document.getElementsByClassName("label-floating");
    let i = 0;
    for (i; input.length; i++) {
      input[i].classList.add("is-focused")
    }
  }

  //Função de cancelar edição de artigos
  cancelar() {
    this.editarbtn = false;
    this.cadastrarbtn = true;
    this.caso = "";
    this.titulo = "";
    }

  //Função de salvar alteração de artigos+exibir alerta de sucesso/erro
  salvar() {
    if ((this.caso != undefined) && (this.caso != "") &&
      (this.titulo != undefined) && (this.titulo != "")) {
      this.afDB.object("CasosClinicos/" + this.key).update({
        caso: this.caso,
        titulo: this.titulo,
      })
        .then(() => {
          this.sucesso2 = true
          setTimeout(() => {
            this.sucesso2 = false
          }, 2000)
          this.caso = "";
          this.titulo = "";
          })
        .catch(() => {
          this.erro = true
          setTimeout(() => {
            this.erro = false
          }, 2000)
        })
    }
    else {
      this.erro = true
      setTimeout(() => {
        this.erro = false
      }, 2000)
    }
  }

  //Função de exluir artigos+exibir alerta de sucesso/erro
  excluir(caso) {
    this.afDB.object("CasosClinicos/" + caso.$key).remove()
      .then(() => {
        this.sucesso3 = true
        setTimeout(() => {
          this.sucesso3 = false
        }, 2000)
      })
  }

}