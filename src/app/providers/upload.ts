import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import {FileUpload} from './fileupload';

@Injectable()
export class UploadFileService {

  private basePath = '/imagens';
  fileUploads: FirebaseListObservable<FileUpload[]>;
  data;
  editar;
  key;

  constructor(private db: AngularFireDatabase) {}

  pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number}, data, editar, key) {
    this.editar = editar;
    this.key = key;
    this.data = data;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL
        fileUpload.name = fileUpload.file.name
        this.saveFileData(fileUpload, data)
      }
    );
  }

  private saveFileData(fileUpload: FileUpload, data) {
    if(this.editar==="nao"){
      this.db.list('Cursos').push(this.data)
      .then((res) => {
        this.db.object('Cursos/' + res.key).update({
          imagem: fileUpload.url
        })
      })
    }
    else if(this.editar==="sim"){
      this.db.object('Cursos/' + this.key).update(this.data)
      .then((res) => {
        this.db.object('Cursos/' + this.key).update({
          imagem: fileUpload.url
        })
      })
    }

  }

  getFileUploads(query = {}) {
    this.fileUploads = this.db.list(this.basePath, {
      query: query
    });
    return this.fileUploads
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.$key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name)
      })
      .catch(error => console.log(error))
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key)
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref()
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}