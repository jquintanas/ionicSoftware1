import { Component, OnInit } from '@angular/core';
//import { Novedad } from 'src/app/core/interface/modelsDB/novedad';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.page.html',
  styleUrls: ['./novedad.page.scss'],
})
export class NovedadPage implements OnInit {

  constructor(
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  getMail() {
    this.storage.get("email");
  }
}
