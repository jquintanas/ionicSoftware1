import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
//import {FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  //form : FormGroup;

  username: string= "";
  password: string= "";

  constructor(public modalController:ModalController) {
   // this.buildForm(); 
   }

  ngOnInit() {
  }

 guardarCambios(){
    console.log("keep data")
  }
 

}
