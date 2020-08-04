import { Component, OnInit } from '@angular/core';
//import { Novedad } from 'src/app/core/interface/modelsDB/novedad';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.page.html',
  styleUrls: ['./novedad.page.scss'],
})
export class NovedadPage implements OnInit {
  private idNovedad: string = "123";
  private reportUser: string = "Pedro Riascos";
  private description: string = "El pedido se demoro mas del tiempo estimado";

  constructor(
    private storage: Storage
  ) { }

  ngOnInit() {}
}
