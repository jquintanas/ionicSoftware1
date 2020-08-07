import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.page.html',
  styleUrls: ['./novedad.page.scss'],
})
export class NovedadPage implements OnInit {
  private idNovedad: string = "";
  private reportUser: string = "";
  private description: string = "";

  constructor(
    private storage: Storage,
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  async ngOnInit() {
    const token = await this.authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + token
    };
    this.httpClient.get(environment.rutas.urlNovelty, { headers }).subscribe(novedad => {
      if (novedad != null) {
        this.publishNovelty(novedad);
        console.log(novedad);
      } else {
        console.log("No hay novedad");
      }
    }, (err => {
      console.log(err);
      console.log ("idNovedad incorrecto");
    }));
  }

  publishNovelty(data) {
      this.idNovedad = data.idnovedad;
      this.description = data.descripcion;
      this.reportUser = data.idUsuarioreportado;
  }
}
