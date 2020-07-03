import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.page.html',
  styleUrls: ['./telefono.page.scss'],
})
export class TelefonoPage implements OnInit {
  private phonePattern: any = /^(9){1}[0-9]{8}$/;
  phoneNumber: string;
  phoneForm = this.formBuilder.group({

    phone: ["", [Validators.required, Validators.pattern(this.phonePattern)]],
    verifyCode: ["", [Validators.required, Validators.maxLength(6)]]
  });

  get phone() {
    return this.phoneForm.get('phone');
  }

  get verifyCode() {
    return this.phoneForm.get('verifyCode');
  }

  public errorMessages = {
    phone: [
      { type: 'required', message: 'Número de teléfono requerido' },
      { type: 'pattern', message: 'Porfavor, ingrese un teléfono correcto' }
    ],
    verifyCode: [
      { type: 'required', message: 'Código de verificación requerido' },
      { type: 'maxLenght', message: 'Código de verificación no válido' }
    ]
  }

  constructor(
    private formBuilder: FormBuilder,
    private firebaseAuthentication: FirebaseAuthentication,
    public alertController: AlertController) { }

  ngOnInit() { }

  askCode() {
    this.firebaseAuthentication.verifyPhoneNumber('+593' + this.phoneNumber, 30000).then(verificationId => {
      alert(verificationId);
    })
  }

  async validateAlert() {
    const alert = await this.alertController.create({
      header: 'Código de Verificación',
      inputs: [
        {
          name: 'code',
          type: 'number',
          placeholder: 'Ingresa tu código'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Verificar',
          handler: (response) => {
            const smsCode = response.code;
           }
        }
      ]
    });
    await alert.present();
  }

}
