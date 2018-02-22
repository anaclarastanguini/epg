import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Carregamento} from './carregamento';

@Injectable()
export class ServicoVideo {

  private basePath = '/videos';
  carregamentos: FirebaseListObservable<Carregamento[]>;
  data;
  editar;
  key;

  constructor(private db: AngularFireDatabase) {}

  pushFileToStorage(carregamento: Carregamento, progress: {percentage: number}, data, editar, key) {
    this.editar = editar;
    this.key = key;
    this.data = data;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${carregamento.file.name}`).put(carregamento.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        carregamento.url = uploadTask.snapshot.downloadURL
        carregamento.name = carregamento.file.name
        this.saveFileData(carregamento, data)
      }
    );
  }

  private saveFileData(carregamento: Carregamento, data) {
    if(this.editar==="nao"){
      this.db.list('Videoaulas').push(this.data)
      .then((res) => {
        this.db.object('Videoaulas/' + res.key).update({
          video: carregamento.url
        })
      })
    }
    else if(this.editar==="sim"){
      this.db.object('Videoaulas/' + this.key).update(this.data)
      .then((res) => {
        this.db.object('Videoaulas/' + this.key).update({
          video: carregamento.url
        })
      })
    }

  }

  getCarregamentos(query = {}) {
    this.carregamentos = this.db.list(this.basePath, {
      query: query
    });
    return this.carregamentos
  }

  deleteCarregamento(carregamento: Carregamento) {
    this.deleteFileDatabase(carregamento.$key)
      .then(() => {
        this.deleteFileStorage(carregamento.name)
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