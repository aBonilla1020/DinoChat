import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../providers/chat-service.service';
import { FormsModule } from '@angular/forms';
import { userInterface } from '../../interfaces/user.interface';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:userInterface = {
    nombre_usuario:'',
    contrasena_usuario:'',
    numero_usuario: 0
  }
  
  constructor(public _cs:ChatServiceService) { }

  ngOnInit(): void {
  }

  ingresar(){
    this._cs.login()
  }

}
