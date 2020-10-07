import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ChatInterface } from '../interfaces/chat.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private itemsCollection: AngularFirestoreCollection<ChatInterface>;

  public chats:ChatInterface[] =[];
  public usuario:any = {};


  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth, private http:HttpClient) {

    this.afAuth.authState.subscribe(user=>{

      if(!user){
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    })
   }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.usuario = {}
    this.afAuth.auth.signOut();
  }


  cargarMensajes(){

    this.itemsCollection = this.afs.collection<ChatInterface>('', ref=> ref.orderBy('fecha', 'desc').limit(10));

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes:ChatInterface[])=>{
       
        this.chats = []
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }

        return this.chats;
       
      })
    )
  }

  agregarMensaje(texto:string){

    let mensaje:ChatInterface ={
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }

    return this.itemsCollection.add(mensaje);
  }

}
