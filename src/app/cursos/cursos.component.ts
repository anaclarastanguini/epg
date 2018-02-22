import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UploadFileService } from '../providers/upload';
import { FileUpload } from '../providers/fileupload';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: FirebaseListObservable<any[]>;
  fileUploads: FirebaseListObservable<FileUpload[]>;
  selectedFiles: FileList
  currentFileUpload: FileUpload
  progress: { percentage: number } = { percentage: 0 }
  curso;
  descricao;
  preco;
  editarFunc = "nao";
  key;
  sucesso;
  editarbtn: boolean = false;
  cadastrarbtn: boolean = true;
  sucesso2: boolean = false;
  erro: boolean = false;
  sucesso3: boolean = false;

  constructor(public afDB: AngularFireDatabase, private uploadService: UploadFileService) {

    //Exibir lista de contatos
    this.cursos = this.afDB.list('/Cursos');
  }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files.item(0)

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  editar(curso) {
    this.editarFunc = "sim";
    this.key = curso.$key;

    this.curso = curso.titulo;
    this.descricao = curso.descricao;
    this.preco = curso.preco;
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
    this.curso = "";
    this.descricao = "";
    this.preco = ""
    this.editarbtn = false;
    this.cadastrarbtn = true;
  }

  cadastrar() {

   
      let data = {
        "titulo": this.curso,
        "descricao": this.descricao,
        "preco": this.preco
        
      }
      this.fazerUpload(data);
      
        

  }

  fazerUpload(data) {
    const file = this.selectedFiles.item(0)
    this.selectedFiles = undefined

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, data, this.editarFunc, this.key)
  }

  excluir(curso) {
    this.afDB.object("Cursos/" + curso.$key).remove()
      .then(() => {
        this.sucesso = true
        setTimeout(() => {
          this.sucesso = false
        }, 2000)
      })
  }

  
  salvar() {
    if ((this.curso != undefined) && (this.curso != "") && (this.descricao != undefined) &&
      (this.descricao != "") && (this.preco != undefined) &&
      (this.preco != "")) {
      this.afDB.object("Cursos/" + this.key).update({
        curso: this.curso,
        preco: this.preco,
        descricao: this.descricao
      })
        .then(() => {
          this.sucesso2 = true
          setTimeout(() => {
            this.sucesso2 = false
          }, 2000)
          this.preco = "";
          this.curso = "";
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