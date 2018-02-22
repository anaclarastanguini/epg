import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Gravacao} from './gravacao';

@Injectable()
export class ServicoAudio {

  private basePath = '/audios';
  gravacoes: FirebaseListObservable<Gravacao[]>;
  data;
  editar;
  key;

  constructor(private db: AngularFireDatabase) {}

  pushFileToStorage(gravacao: Gravacao, progress: {percentage: number}, data, editar, key) {
    this.editar = editar;
    this.key = key;
    this.data = data;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${gravacao.file.name}`).put(gravacao.file);

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
        gravacao.url = uploadTask.snapshot.downloadURL
        gravacao.name = gravacao.file.name
        this.saveFileData(gravacao, data)
      }
    );
  }

  private saveFileData(gravacao: Gravacao, data) {
    if(this.editar==="nao"){
      this.db.list('Podcasts').push(this.data)
      .then((res) => {
        this.db.object('Podcasts/' + res.key).update({
          audio: gravacao.url
        })
      })
    }
    else if(this.editar==="sim"){
      this.db.object('Podcasts/' + this.key).update(this.data)
      .then((res) => {
        this.db.object('Podcasts/' + this.key).update({
          audio: gravacao.url
        })
      })
    }

  }

  getGravacoes(query = {}) {
    this.gravacoes = this.db.list(this.basePath, {
      query: query
    });
    return this.gravacoes
  }

  deleteGravacao(gravacao: Gravacao) {
    this.deleteFileDatabase(gravacao.$key)
      .then(() => {
        this.deleteFileStorage(gravacao.name)
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