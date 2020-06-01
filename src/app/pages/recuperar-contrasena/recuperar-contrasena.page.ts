import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
AlertsService
@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {


  formulario_r : FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private formBuilder: FormBuilder, private router: Router,private modalController: ModalController,public alertsService: AlertsService) { 
    this.buildForm();
  }

  ngOnInit() {
    
  }

  buildForm(){
    this.formulario_r =this.formBuilder.group({
      correo: ['',[Validators.required,Validators.pattern(this.emailPattern)]],
    });
  }

  dismissLogin() {
    this.modalController.dismiss();
  }
  save() {
    if (this.formulario_r.valid) {
      const value = this.formulario_r.value;
      console.log(value);
      console.log(this.formulario_r);
      this.alertsService.presentLoading("Enviando Correo");
    }else{
      console.log('formulario inválido',this.formulario_r);
      //this.isSubmitted = true;
      this.onResetForm();
      
    }
  }


  get correo(){
    return this.formulario_r.get('correo');
  }


  onResetForm(){
    this.formulario_r.reset();
  }

  regresar(){
    this.router.navigateByUrl('login');
  }
}
