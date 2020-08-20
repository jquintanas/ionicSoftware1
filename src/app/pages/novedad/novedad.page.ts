import { Component, OnInit } from '@angular/core';
import { NovedadesService } from 'src/app/core/services/novedades/novedades.service';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.page.html',
  styleUrls: ['./novedad.page.scss'],
})
export class NovedadPage implements OnInit {
  visible: string;
  constructor(
    private novedadService: NovedadesService,
  ) { }

  ngOnInit() {
    // FALTA VALIDAR PANTALLA DE CUANDO HAY Y NO HAY NOVEDAD
    // SOLO SE DEBE SETEAR A LA VARIABLE VISIBLE
    this.novedadService.getNovedadesReportadas();
    this.visible = "false";
  }
}
