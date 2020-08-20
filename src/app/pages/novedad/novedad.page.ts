import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';
import { RepartidorService } from 'src/app/core/services/repartidor/repartidor.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.page.html',
  styleUrls: ['./novedad.page.scss'],
})
export class NovedadPage implements OnInit {
  idNovedad: string = "";
  private reportUser: string = "";
  description: string = "";
  private noveltyList: number[];
  reportUserName: string;

  constructor(
    private httpClient: HttpClient,
    private userInfoService: UserInfoService,
    private repartidorService: RepartidorService,
    private alertService: AlertsService
  ) { }

  async ngOnInit() {
    await this.httpClient.get(environment.rutas.reportaNovelty + this.userInfoService.cedula)
      .subscribe(data => {
        if (data != null) {
          console.log(data);
          for (let i = 0; i < 5; i++) {
            this.setIdNovelty(data[i]);
            this.httpClient.get(environment.rutas.urlNovelty + this.noveltyList).subscribe(novedad => {
              if (novedad != null) {
                this.publishNovelty(novedad);
                this.getNameDeliveryByID();
                console.log(novedad);
              } else {
                console.log("No hay novedad");
              }
            }, (err => {
              console.log(err);
              console.log("idNovedad incorrecto");
            }));
          }
        }
      });
  }

  publishNovelty(data) {
    this.idNovedad = data.idnovedad;
    this.description = data.descripcion;
    this.reportUser = data.idUsuarioreportado;
  }

  setIdNovelty(data) {
    this.noveltyList = data.idnovedad;
  }

  getNameDeliveryByID() {
    this.repartidorService.obtenerRepartidorPorID(this.reportUser).subscribe(
      dt => {
        this.reportUserName = dt[0].nombre + " " + dt[0].apellido;
      },
      async err => {
        console.log(err);
        await this.alertService.mostrarToastError();
      }
    );
  }
}
