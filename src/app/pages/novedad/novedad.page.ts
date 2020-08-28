import { Component, OnInit } from '@angular/core';
import { NovedadesService } from 'src/app/core/services/novedades/novedades.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.page.html',
  styleUrls: ['./novedad.page.scss'],
})

/**
 * @classdesc Container class of Novelty.
 * @desc Creation Date: 08/20/2020
 * @class
 * @public
 * @version 1.0.0
 * @author Francesca Man Ging <fman@espol.edu.ec>
 */

export class NovedadPage implements OnInit {
  visible: string;
  existe: boolean;
  listaNovedades: [];
  constructor(
    private novedadService: NovedadesService,
    private httpClient: HttpClient,
    private userInfoService: UserInfoService,
  ) { }

  ngOnInit() {
    this.httpClient.get(environment.rutas.reportaNovelty + this.userInfoService.cedula)
      .toPromise().then((data) => {
        if (Object.keys(data).length > 0) {
          this.visible = "true";
          this.novedadService.getNovedadesReportadas();
          this.listaNovedades = this.novedadService.listNovelty;
        } else {
          this.visible = "false";
        }
      });
    }
  }
