import { Injectable } from '@angular/core';
import { SeguridadService } from 'src/app/core/services/seguridad.service';
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
  noveltyList: number;
  reportUserName: string;
  visible: string;
  listNovelty: any;
  constructor(
    private httpClient: HttpClient,
    private seguridad: SeguridadService,
    private userInfoService: UserInfoService,
    private repartidorService: RepartidorService,
    private alertService: AlertsService,
  ) { }

  createNovelty(novedad: any) {
    const hash = this.seguridad.hashJSON(novedad);
    novedad.hash = hash;
    console.log(novedad);
    this.httpClient.post(environment.rutas.urlNovelty, novedad)
    .toPromise().then( (dt) => {
      console.log("Novedad reportada");
    }).catch ((err) => {
      console.log(err);
    });
  }

  async getNovedadesReportadas() {
    this.listNovelty = [];
    await this.httpClient.get(environment.rutas.reportaNovelty + this.userInfoService.cedula)
      .toPromise().then((data) => {
        if (data != null) {
          console.log(data);
          for (let i = 0; i < 5; i++) {
            this.setIdNovelty(data[i]);
            this.httpClient.get(environment.rutas.urlNovelty + this.noveltyList).toPromise().then(novedad => {
              if (novedad != null) {
                this.listNovelty.push(novedad);
                console.log(this.listNovelty);
              } else {
                console.log("Error: idNovedad");
              }
            });
          }
          console.log(this.listNovelty);
        }
      }).catch((err) => {
        console.log("no hay Novedad");
        console.log(err);
      });
  }

  setIdNovelty(data) {
    this.noveltyList = data.idnovedad;
    this.reportUser = data.idUsuarioreportado;
  }

  publishNovelty(data) {
    const novedad = {
    idNovedad : data.idnovedad,
    description : data.descripcion,
    };
    this.listNovelty.push(novedad);
  }

  getNameDeliveryByID() {
    this.repartidorService.obtenerRepartidorPorID(this.reportUser).subscribe(
      dt => {
        this.reportUserName = dt[0].nombre + " " + dt[0].apellido;
        return this.reportUserName;
      },
      async err => {
        console.log(err);
        await this.alertService.mostrarToastError();
      }
    );
  }


}
