import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.page.html',
  styleUrls: ['./novedad.page.scss'],
})
export class NovedadPage implements OnInit {
  private idNovedad: string = "";
  private reportUser: string = "";
  private description: string = "";
  private noveltyList: number [];

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private userInfoService: UserInfoService
  ) { }

  async ngOnInit() {
    const token = await this.authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + token
    };
    await this.httpClient.get(environment.rutas.reportaNovelty + this.userInfoService.cedula)
    .subscribe(data => {
      if (data != null) {
        console.log(data);
        for (let i = 0 ; i < 5 ; i++) {
        this.setIdNovelty(data[i]);
        console.log(this.noveltyList);
        this.httpClient.get(environment.rutas.urlNovelty + this.noveltyList, { headers }).subscribe(novedad => {
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
}
