import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage implements OnInit {
  formulario_r : FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router,private modalController: ModalController) {
    this.buildForm();
   }

  ngOnInit() {
  }
  buildForm(){
    this.formulario_r =this.formBuilder.group({
      contrasena: ['',[Validators.required,Validators.minLength(8)]],
      contrasenac: ['',[Validators.required,this.validarContrasena('contrasena')]],
    });
  }

  save() {
    if (this.formulario_r.valid) {
      console.log(this.formulario_r);
      this.router.navigateByUrl('login');
    }else{
      
      console.log('formulario inválido',this.formulario_r);     
    }

  }
  get contrasena(){
    return this.formulario_r.get('contrasena');
  }
  get contrasenac(){
    return this.formulario_r.get('contrasenac');
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

}
