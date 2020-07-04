import { AlertsService } from "src/app/services/alerts/alerts.service";
import { MapaDatosService } from "./../../services/mapa-datos/mapa-datos.service";
import { Component, OnInit } from "@angular/core";
import * as Mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { environment } from "./../../../environments/environment";
import { ModalController, NavController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-mapa-mapbox",
  templateUrl: "./mapa-mapbox.page.html",
  styleUrls: ["./mapa-mapbox.page.scss"],
})
export class MapaMapboxPage implements OnInit {
  mapa: Mapboxgl.Map;
  element: any;
  latitud: number;
  longitud: number;
  latitudCentro: number;
  longitudCentro: number;
  nuevoMarcador: Mapboxgl.Marker;
  guardar = true;
  posicion: string = "";
  reverseGeocode: MapboxGeocoder;
  omipaliubi = false;
  botonGuardarnuevo = true;
  direccionDom = true;
  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    private mapaDatosService: MapaDatosService,
    public geolocation: Geolocation,
    public alertsService: AlertsService,
    public navCtrl: NavController
  ) {
    if (this.mapaDatosService.NuevaUbicacion == false) {
      this.omipaliubi = true;
      this.botonGuardarnuevo = false;
      this.direccionDom = false;
    }
  }

  ionViewWillEnter() {}

  ngOnInit() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        if (this.mapaDatosService.NuevaUbicacion == false) {
          this.latitudCentro = -1.8025916;
          this.longitudCentro = -79.539615;
        } else {
          this.latitudCentro = resp.coords.latitude;
          this.longitudCentro = resp.coords.longitude;
        }
        (Mapboxgl as any).accessToken = environment.mapboxkey;
        this.mapa = new Mapboxgl.Map({
          container: "mapa", 
          style: "mapbox://styles/mapbox/streets-v11",
          center: [this.longitudCentro, this.latitudCentro], 
          zoom: 13, 
        });

        this.mapa.on("load", () => {
          this.mapa.resize();
        });

        const marker_omipali = new Mapboxgl.Marker({
          draggable: false,
          color: "red",
        })
          .setLngLat([-79.5419038, -1.8017518])
          .setPopup(
            new Mapboxgl.Popup({ offset: 30 })
              .setHTML(
                "<h1> <STRONG>Omi&Pali</STRONG> </h1>" +
                  '<hr color="black">' +
                  "<p>" +
                  "<STRONG>Pastelería </STRONG>" +
                  "<style> h1 { color: #FF0000; font-size: 1rem}</style>"
              )
          )
          .addTo(this.mapa);
        //marcador en ubicacion de usuario
        const marker_user = new Mapboxgl.Marker({
          draggable: true,
          color: "orange",
        })
          .setLngLat([resp.coords.longitude, resp.coords.latitude])
          .setPopup(
            new Mapboxgl.Popup({ offset: 30 })
              .setHTML(
                "<body>" +
                  '<div class="title">' +
                  "<h3> Información </h3>" +
                  '<hr color="black">' +
                  "<p> Este marcador indica su ubicación </p>" +
                  "</div>" +
                  "</body>" +
                  "<style> h3 { color: orange; font-size: 1rem}</style>"
              )
          )
          .addTo(this.mapa);
        marker_user.on("dragend", () => {
          var lngLat = marker_user.getLngLat();
          this.latitud = lngLat.lat;
          this.longitud = lngLat.lng;
        });
        this.latitud = marker_user.getLngLat().lat;
        this.longitud = marker_user.getLngLat().lng;

        const geocoder = new MapboxGeocoder({
          accessToken: Mapboxgl.accessToken,
          countries: "ec",
          mapboxgl: Mapboxgl,
          zoom: 15,
          marker: { color: "blue" },
          placeholder: "Buscar",
          language: "es-EC",
        });
        this.mapa.addControl(geocoder);
        const geolocalizacion = new Mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
        });
        this.mapa.addControl(geolocalizacion);
      })
      .catch((error) => {
        console.log("Error al capturar su ubicación", error);
      });
  }

  async saveMarker() {
    this.mapaDatosService.latitud = this.latitud;
    this.mapaDatosService.longitud = this.longitud;
    this.mapaDatosService.marcador_guardado = true;
    this.posicion = this.latitud.toString() + "|" + this.longitud.toString();
    if(this.botonGuardarnuevo == true){
      this.alertsService.presentToast("Posición guardada");
    }
    await this.modalController.dismiss(this.posicion);
  }

  async markerSuccessfully() {
    const alert = await this.alertController.create({
      header: "Guardado exitoso",
      message: "<hr>" + "<STRONG>La ubicación se guardó con éxito. </strong>",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async closeModal() {
    await this.saveMarker();
  }
}
