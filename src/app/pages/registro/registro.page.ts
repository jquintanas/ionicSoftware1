import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';

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
  private idPattern : any = /^[0-9]{10}$/;
  private phonepattern : any = /^(09){1}[0-9]{8}$/;

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.buildForm(); 
    this.buildForm2();
    this.paso_formulario = 1;
  
  }

  ngOnInit() {

  }

  buildForm(){
    this.form = this.formBuilder.group({
      cedula: ['',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(this.idPattern)]],
      nombres: ['',[Validators.required,Validators.minLength(5)]],
      apellidos: ['',[Validators.required,Validators.minLength(5)]],
      telefono: ['',[Validators.required,Validators.maxLength(10),Validators.minLength(10), Validators.pattern(this.phonepattern)]],
      correo: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
      contrasena: ['',[Validators.required,]],
      contrasenac: ['',[Validators.required,this.validarContrasena('contrasena')]]

    });
  }

  buildForm2(){
    this.form2 = this.formBuilder.group({
      domicilio:['',[Validators.required,Validators.minLength(10)]],
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
    console.log("hola");
    this.paso_formulario = 1;
  }
  regresar(){
    console.log("regresa a la primera parte del formulario");
    this.paso_formulario = 1;
  }
}

//^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$