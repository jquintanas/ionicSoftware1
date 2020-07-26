import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage implements OnInit {
  formularioR: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private modalController: ModalController) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.formularioR = this.formBuilder.group({
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      contrasenac: ['', [Validators.required, this.validarContrasena('contrasena')]],
    });
  }

  save() {
    if (this.formularioR.valid) {
      console.log(this.formularioR);
      this.router.navigateByUrl('login');
    } else {

      console.log('formulario inválido', this.formularioR);
    }

  }
  get contrasena() {
    return this.formularioR.get('contrasena');
  }
  get contrasenac() {
    return this.formularioR.get('contrasenac');
  }
  validarContrasena(fieldName): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const input = control.value;
      const isValid = control.root.value[fieldName] === input;
      if (!isValid) {
        return { validarContrasena: { isValid } };
      } else {
        return null;
      }
    };
  }

}
