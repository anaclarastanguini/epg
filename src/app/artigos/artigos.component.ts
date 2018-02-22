import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-artigos',
  templateUrl: './artigos.component.html',
  styleUrls: ['./artigos.component.css']
})
export class ArtigosComponent implements OnInit {

  //Variáveis
  artigos: FirebaseListObservable<any[]>;
  titulo;
  artigo;
  sucesso: boolean = false;
  erro: boolean = false;
  cadastrarbtn: boolean = true;
  editarbtn: boolean = false;
  sucesso2: boolean = false;
  sucesso3: boolean = false;
  key;

  constructor(public afDB: AngularFireDatabase) { 
    
    //Listar artigos no banco de dados
    this.artigos = this.afDB.list('/Artigos');
  }

  ngOnInit() { }

  //Função de cadastrar artigos+exibir alerta de sucesso/erro
  cadastrar() {
    if ((this.artigo != undefined) && (this.artigo != "") &&
      (this.titulo != undefined) && (this.titulo != "")) {
      this.afDB.list('/Artigos').push({
        artigo: this.artigo,
        titulo: this.titulo,

      })
        .then(() => {
          this.sucesso = true
          setTimeout(() => {
            this.sucesso = false
          }, 2000)
          this.artigo = "";
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
  editar(artigo) {
    this.artigo = artigo.artigo;
    this.titulo = artigo.titulo;
    this.editarbtn = true;
    this.cadastrarbtn = false;
    this.key = artigo.$key;
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
    this.artigo = "";
    this.titulo = "";
    }

  //Função de salvar alteração de artigos+exibir alerta de sucesso/erro
  salvar() {
    if ((this.artigo != undefined) && (this.artigo != "") &&
      (this.titulo != undefined) && (this.titulo != "")) {
      this.afDB.object("Artigos/" + this.key).update({
        artigo: this.artigo,
        titulo: this.titulo,
      })
        .then(() => {
          this.sucesso2 = true
          setTimeout(() => {
            this.sucesso2 = false
          }, 2000)
          this.artigo = "";
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
  excluir(artigo) {
    this.afDB.object("Artigos/" + artigo.$key).remove()
      .then(() => {
        this.sucesso3 = true
        setTimeout(() => {
          this.sucesso3 = false
        }, 2000)
      })
  }

}