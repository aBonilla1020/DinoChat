import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../providers/chat-service.service';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje:string = "";
  elemento:any;

  constructor(public _cs:ChatServiceService) { 

    this._cs.cargarMensajes().subscribe(()=>{

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 25);
    }
    );

  }

  ngOnInit(): void {
    this.elemento = document.getElementById("app-mensajes");
  }

  enviarMensaje(){

    if(this.mensaje.length === 0){
      return;
    }

    this._cs.agregarMensaje(this.mensaje)
                                         .then(()=>this.mensaje = "")
                                         .catch((error)=>console.error(error));
  }
}
