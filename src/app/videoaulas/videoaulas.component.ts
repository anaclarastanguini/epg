import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ServicoVideo } from '../providers/videos';
import { Carregamento } from '../providers/carregamento';

@Component({
  selector: 'app-videoaulas',
  templateUrl: './videoaulas.component.html',
  styleUrls: ['./videoaulas.component.css']
})
export class VideoaulasComponent implements OnInit {

  videoaulas: FirebaseListObservable<any[]>;
  carregamentos: FirebaseListObservable<Carregamento[]>;
  selectedFiles: FileList;
  currentCarregamento: Carregamento;
  progress: { percentage: number } = { percentage: 0 }
  video;
  descricao;
  editarFunc = "nao";
  key;
  sucesso;
  editarbtn: boolean = false;
  cadastrarbtn: boolean = true;
  sucesso2: boolean = false;
  erro: boolean = false;
  sucesso3: boolean = false;

  constructor(public afDB: AngularFireDatabase, private uploadService: ServicoVideo) {

    //Exibir lista de contatos
    this.videoaulas = this.afDB.list('/Videoaulas');
  }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files.item(0)

    if (file.type.match('video.*')) {
      this.selectedFiles = event.target.files;
      console.log(this.selectedFiles)
    } else {
      alert('invalid format!');
    }
  }

  editar(video) {
    this.editarFunc = "sim";
    this.key = video.$key;

    this.video = video.titulo;
    this.descricao = video.descricao;
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
    this.video = "";
    this.descricao = "";
    this.editarbtn = false;
    this.cadastrarbtn = true;
  }

  cadastrar() {

    let data = {
      "titulo": this.video,
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
    this.currentCarregamento = new Carregamento(file);
    this.uploadService.pushFileToStorage(this.currentCarregamento, this.progress, data, this.editarFunc, this.key)
  }

  excluir(video) {
    this.afDB.object("Videoaulas/" + video.$key).remove()
      .then(() => {
        this.sucesso = true
        setTimeout(() => {
          this.sucesso = false
        }, 2000)
      })
  }

  //Função de salvar alteração de Videoaulas+exibir alerta de sucesso/erro
  salvar() {
    if ((this.video != undefined) && (this.video != "") && (this.descricao != undefined) &&
      (this.descricao != "")) {
      this.afDB.object("Videoaulas/" + this.key).update({
        video: this.video,
        descricao: this.descricao
      })
        .then(() => {
          this.sucesso2 = true
          setTimeout(() => {
            this.sucesso2 = false
          }, 2000)
          this.video = "";
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