import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';
import { RepartidorService } from 'src/app/core/services/repartidor/repartidor.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {
  idNovedad: string;
  reportUser: string;
  description: string;
  noveltyList: number[];
  reportUserName: string;
  constructor(
    private httpClient: HttpClient,
    private userInfoService: UserInfoService,
    private repartidorService: RepartidorService,
    private alertService: AlertsService,
  ) { }

   getNovedadesReportadas() {
     this.httpClient.get(environment.rutas.reportaNovelty + this.userInfoService.cedula)
      .toPromise().then((data) => {
        console.log(data);
        if (data != null) {
          console.log(data);
          for (let i = 0; i < 5; i++) {
            this.setIdNovelty(data[i]);
            this.httpClient.get(environment.rutas.urlNovelty + this.noveltyList).toPromise().then(novedad => {
              if (novedad != null) {
                this.publishNovelty(novedad);
                this.getNameDeliveryByID();
                console.log(novedad);
              } else {
                console.log("Error: idNovedad");
              }
          });
        }}}).catch ( (err) => {
        console.log("no hay Novedad");
        console.log(err);
      });
  }

  setIdNovelty(data) {
    this.noveltyList = data.idnovedad;
  }

  publishNovelty(data) {
    this.idNovedad = data.idnovedad;
    this.description = data.descripcion;
    this.reportUser = data.idUsuarioreportado;
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
