import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChildren,
  AfterViewInit,
} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { MapaMapboxPage } from './../mapa-mapbox/mapa-mapbox.page';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";

//import {FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl} from '@angular/forms';

@Component({
  selector: "app-editar-perfil",
  templateUrl: "./editar-perfil.page.html",
  styleUrls: ["./editar-perfil.page.scss"],
})
export class EditarPerfilPage implements OnInit {
  constructor(
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public renderer: Renderer2,
    public el: ElementRef
  ) {}

  registrationForm = this.formBuilder.group({
    name: ["", [Validators.required, Validators.maxLength(100)]],
    email: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"),
      ],
    ],
    phone: [
      "",
      [
        Validators.required,
        Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"),
      ],
    ],
  });

  ngOnInit() {}

  get name() {
    return this.registrationForm.get("name");
  }

  get email() {
    return this.registrationForm.get("email");
  }
  get phone() {
    return this.registrationForm.get("phone");
  }

  public errorMessages = {
    name: [
      { type: "required", message: "Usuario es requerido" },
      { type: "maxlength", message: "El usuario no puede tener más de 100 caracteres" },
    ],
    email: [
      { type: "required", message: "Email es requerido" },
      { type: "pattern", message: "El email es inválido" },
    ],
    phone: [
      { type: "required", message: "Celular es requerido" },
      { type: "pattern", message: "El número es inválido" },
    ],
  };

  public submit() {
    console.log(this.registrationForm.value);
  }

  async openModal() {

    const modal = await this.modalController.create({
      component: MapaMapboxPage,
    });
    return await modal.present();

  }

}
