import { ModalController } from '@ionic/angular';
import { RecuperarContrasenaPage } from './../recuperar-contrasena/recuperar-contrasena.page';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isSubmitted = false;
  currentPopover = null;
  formulario_login : FormGroup;
  private phonepattern : any = /^(09){1}[0-9]{8}$/;
  constructor(private formBuilder: FormBuilder, private router: Router, public modalController:ModalController) { 
    this.buildForm();
  }

  ngOnInit() {
    
  }

  buildForm(){
    this.formulario_login =this.formBuilder.group({
      telefono: ['',[Validators.required,Validators.maxLength(10),Validators.minLength(10), Validators.pattern(this.phonepattern)]],
      contrasena: ['',[Validators.required,Validators.minLength(8)]],
    });
  }


  save() {
    if (this.formulario_login.valid) {
      const value = this.formulario_login.value;
      console.log(value);
      console.log(this.formulario_login);
    }else{
      console.log('formulario inválido',this.formulario_login);
      //this.isSubmitted = true;
      this.onResetForm();
      
    }
  }


  get telefono(){
    return this.formulario_login.get('telefono');
  }
  get contrasena(){
    return this.formulario_login.get('contrasena');
  }

  onResetForm(){
    this.formulario_login.reset();
  }

  abrirRegistro(){
    this.router.navigateByUrl('registro');
    //[routerLink]="['/registro']
  }

  async abrirContrasena() {
    const modal = await this.modalController.create({
      component: RecuperarContrasenaPage
    });
    return await modal.present();
    
  }

}

