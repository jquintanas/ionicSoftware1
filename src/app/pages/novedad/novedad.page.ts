import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NovedadesService } from 'src/app/core/services/novedades/novedades.service';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.page.html',
  styleUrls: ['./novedad.page.scss'],
})
export class NovedadPage implements OnInit {

  constructor(
    private novedadService: NovedadesService,
  ) { }

  async ngOnInit() {
    this.novedadService.getNovedadesReportadas();
  }
}
