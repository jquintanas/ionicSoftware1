import { Component, OnInit, Renderer2, ElementRef} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MapaMapboxPage } from "../mapa-mapbox/mapa-mapbox.page";
import { FormBuilder, Validators} from "@angular/forms";
import {environment} from "src/environments/environment"

@Component({
  selector: "app-editar-perfil",
  templateUrl: "./editar-perfil.page.html",
  styleUrls: ["./editar-perfil.page.scss"],
})
export class EditarPerfilPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public renderer: Renderer2,
    public el: ElementRef,
  ) {}

  userDataForm = this.formBuilder.group({
    name:      ["", [Validators.required, Validators.maxLength(100)]],
    direccion: ["", [Validators.required]],
    email:     ["", [Validators.required, Validators.pattern(environment.emailPatter)]],
    phone:     ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(environment.phonePatter)]],
  });

  ngOnInit() {}

  get name() {
    return this.userDataForm.get("name");
  }

  get email() {
    return this.userDataForm.get("email");
  }
  get phone() {
    return this.userDataForm.get("phone");
  }
  get direccion() {
    return this.userDataForm.get("direccion");
  }

  public submit() {
    console.log(this.userDataForm.value);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: MapaMapboxPage,
    });    
    return await modal.present();
  }


  public MessageValidator(error) {
    if (error) {
      return "campo requerido";
    }

    if (!error) {
      return "campo inválido";
    }

    return " ";
  }


}
