import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ServicoAudio } from '../providers/audios';
import { Gravacao } from '../providers/gravacao';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.css']
})
export class PodcastsComponent implements OnInit {

  podcasts: FirebaseListObservable<any[]>;
  gravacoes: FirebaseListObservable<Gravacao[]>;
  selectedFiles: FileList;
  currentGravacao: Gravacao;
  progress: { percentage: number } = { percentage: 0 }
  audio;
  descricao;
  editarFunc = "nao";
  key;
  sucesso;
  editarbtn: boolean = false;
  cadastrarbtn: boolean = true;
  sucesso2: boolean = false;
  erro: boolean = false;
  sucesso3: boolean = false;

  constructor(public afDB: AngularFireDatabase, private uploadService: ServicoAudio) {

    //Exibir lista de contatos
    this.podcasts = this.afDB.list('/Podcasts');
  }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files.item(0)

    if (file.type.match('audio.*')) {
      this.selectedFiles = event.target.files;
      console.log(this.selectedFiles)
    } else {
      alert('invalid format!');
    }
  }

  editar(audio) {
    this.editarFunc = "sim";
    this.key = audio.$key;

    this.audio = audio.titulo;
    this.descricao = audio.descricao;
    this.editarbtn = true;
    this.cadastrarbtn = false;

    let input = document.getElementsByClassName("label-floating");
    let i = 0;
    for (i; input.length; i++) {
      input[i].classList.add("is-focused")
    }
  }

  cancelar() {
    this.editarFunc = "nao"
    this.audio = "";
    this.descricao = "";
    this.editarbtn = false;
    this.cadastrarbtn = true;
  }

  cadastrar() {

    let data = {
      "titulo": this.audio,
      "descricao": this.descricao,
          }

    this.fazerUpload(data);
  }

  fazerUpload(data) {
    console.log(this.selectedFiles);
    const file = this.selectedFiles.item(0);
    console.log("file:" + file);
    this.selectedFiles = undefined;

    console.log(file);
    this.currentGravacao = new Gravacao(file);
    this.uploadService.pushFileToStorage(this.currentGravacao, this.progress, data, this.editarFunc, this.key)
  }

  excluir(audio) {
    this.afDB.object("Podcasts/" + audio.$key).remove()
      .then(() => {
        this.sucesso = true
        setTimeout(() => {
          this.sucesso = false
        }, 2000)
      })
  }

  //Função de salvar alteração de Videoaulas+exibir alerta de sucesso/erro
  salvar() {
    if ((this.audio != undefined) && (this.audio != "") && (this.descricao != undefined) &&
      (this.descricao != "")) {
      this.afDB.object("Podcasts/" + this.key).update({
        audio: this.audio,
        descricao: this.descricao
      })
        .then(() => {
          this.sucesso2 = true
          setTimeout(() => {
            this.sucesso2 = false
          }, 2000)
          this.audio = "";
          this.descricao = "";
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

}