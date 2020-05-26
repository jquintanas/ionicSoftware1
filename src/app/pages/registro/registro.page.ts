import { MapaDatosService } from './../../services/mapa-datos/mapa-datos.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { MapaMapboxPage } from './../mapa-mapbox/mapa-mapbox.page';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  form : FormGroup;
  form2 : FormGroup;
  paso_formulario : number;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 //private idPattern : any = /^[0-9]{1}$/;
  private phonepattern : any = /^(09){1}[0-9]{8}$/;

  constructor(private formBuilder: FormBuilder, 
              private router: Router,public modalController:ModalController,
              public mapaDatosService: MapaDatosService) { 
    this.buildForm(); 
    this.buildForm2();
    this.paso_formulario = 1; 
    
  }

  ngOnInit() {
    console.log(this.mapaDatosService.longitud);
  }

  buildForm(){
    this.form = this.formBuilder.group({
      cedula: ['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      nombres: ['',[Validators.required,Validators.minLength(5)]],
      apellidos: ['',[Validators.required,Validators.minLength(4)]],
      telefono: ['',[Validators.required,Validators.maxLength(10),Validators.minLength(10), Validators.pattern(this.phonepattern)]],
      correo: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
      contrasena: ['',[Validators.required, Validators.minLength(8)]],
      contrasenac: ['',[Validators.required,this.validarContrasena('contrasena')]]

    });
  }
//[disabled]="!form.valid"
  buildForm2(){
    this.form2 = this.formBuilder.group({
      referencias:['']
    });
  }

  save(){
    console.log("hola");
    this.paso_formulario = 2;
  }

  validarContrasena(field_name): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} => {   
      let input = control.value;     
      let isValid = control.root.value[field_name]==input
      if(!isValid){
        return { 'validarContrasena': {isValid} }
      }
      else{
        return null;
      }
    };
  }
  
  save2(){
    console.log("entra a la segunda parte del formulario");
    this.paso_formulario = 1;
  }
  regresar(){
    console.log("regresa a la primera parte del formulario");
    this.paso_formulario = 1;
  }
  get cedula(){
    return this.form.get('cedula');
  }
  get nombres(){
    return this.form.get('nombres');
  }
  get apellidos(){
    return this.form.get('apellidos');
  }
  get telefono(){
    return this.form.get('telefono');
  }
  get correo(){
    return this.form.get('correo');
  }
  get contrasena(){
    return this.form.get('contrasena');
  }
  get contrasenac(){
    return this.form.get('contrasenac');
  }
  get domicilio(){
    return this.form2.get('domicilio');
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: MapaMapboxPage
    });
    return await modal.present();
    
  }
}
