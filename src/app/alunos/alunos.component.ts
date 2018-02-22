import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  //Variáveis
  alunos: FirebaseListObservable<any[]>;
  aluno;
  email;
  sucesso: boolean = false;
  erro: boolean = false;
  cadastrarbtn: boolean = true;
  editarbtn: boolean = false;
  sucesso2: boolean = false;
  sucesso3: boolean = false;
  key;

  constructor(public afDB: AngularFireDatabase) {

    //Listar alunos no banco de dados
    this.alunos = this.afDB.list('/Alunos');
  }

  ngOnInit() { }

  //Função de cadastrar alunos+exibir alerta de sucesso/erro
  cadastrar() {
    if ((this.aluno != undefined) && (this.aluno != "") && (this.email != undefined) &&
      (this.email != "")) {
      this.afDB.list('/Alunos').push({
        aluno: this.aluno,
        email: this.email
      })
        .then(() => {
          this.sucesso = true
          setTimeout(() => {
            this.sucesso = false
          }, 2000)
          this.aluno = "";
          this.email = "";
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

  //Função de editar alunos
  editar(aluno) {
    this.email = aluno.email;
    this.aluno = aluno.aluno;
    this.editarbtn = true;
    this.cadastrarbtn = false;
    this.key = aluno.$key;
    let input = document.getElementsByClassName("label-floating");
    let i = 0;
    for (i; input.length; i++) {
      input[i].classList.add("is-focused")
    }
  }

  //Função de cancelar edição de alunos
  cancelar() {
    this.editarbtn = false;
    this.cadastrarbtn = true;
    this.aluno = "";
    this.email = "";
  }

  //Função de salvar alteração de alunos+exibir alerta de sucesso/erro
  salvar() {
    if ((this.aluno != undefined) && (this.aluno != "") && (this.email != undefined) &&
      (this.email != "")) {
      this.afDB.object("Alunos/" + this.key).update({
        aluno: this.aluno,
        email: this.email
      })
        .then(() => {
          this.sucesso2 = true
          setTimeout(() => {
            this.sucesso2 = false
          }, 2000)
          this.aluno = "";
          this.email = "";
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

  //Função de exluir alunos+exibir alerta de sucesso/erro
  excluir(aluno) {
    this.afDB.object("Alunos/" + aluno.$key).remove()
      .then(() => {
        this.sucesso3 = true
        setTimeout(() => {
          this.sucesso3 = false
        }, 2000)
      })
  }

}