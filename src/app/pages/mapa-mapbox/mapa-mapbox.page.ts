import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { MapaDatosService } from './../../services/mapa-datos/mapa-datos.service';
import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment} from './../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-mapa-mapbox',
  templateUrl: './mapa-mapbox.page.html',
  styleUrls: ['./mapa-mapbox.page.scss'],
})
export class MapaMapboxPage implements OnInit {
  mapa: Mapboxgl.Map;
  element: any;
  latitud: number;
  longitud : number;
  latitudCentro: number;
  longitudCentro: number;
  nuevoMarcador: Mapboxgl.Marker;
  guardar = true;
  constructor(private modalController: ModalController, public alertController: AlertController, private mapaDatosService: MapaDatosService,public geolocation: Geolocation, public alertsService: AlertsService) {
    
   }

  ionViewWillEnter(){
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitudCentro = resp.coords.latitude;
      this.longitudCentro = resp.coords.longitude;
      //console.log(resp.coords.longitude,resp.coords.latitude);
      (Mapboxgl as any).accessToken = environment.mapboxkey;
      this.mapa = new Mapboxgl.Map({
        container: 'mapa', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        //center:[-79.5419038,-1.8017518],
        center: [ resp.coords.longitude,resp.coords.latitude], // coordenadas del usuario
        zoom: 13 // starting zoom
      });

      this.mapa.on('load', ()=> {
        this.mapa.resize();        
        });
      /*
        Posicion del local OmiPali
      */
      const marker_omipali = new Mapboxgl.Marker({draggable: false,color: 'red'})     
        .setLngLat([-79.5419038,-1.8017518])
        .setPopup(
          new Mapboxgl.Popup({ offset: 30 }) // add popups
            .setHTML('<h1> <STRONG>Omi&Pali</STRONG> </h1>'+
                      '<hr color="black">'+
                      '<p>'+'<STRONG>Pastelería </STRONG>'+'<style> h1 { color: #FF0000; font-size: 1rem}</style>')              
        )
        .addTo(this.mapa);

      //marcador en ubicacion de usuario
      const marker_user= new Mapboxgl.Marker({draggable: true,color: 'orange'})     
      .setLngLat([resp.coords.longitude,resp.coords.latitude])
      .setPopup(
        new Mapboxgl.Popup({ offset: 30 }) // add popups
          .setHTML('<body>'+ 
                      '<div class="title">'+
                        '<h3> Información </h3>'+
                        '<hr color="black">'+
                        '<p> Este marcador indica su ubicación </p>'+
                      '</div>'+
                    '</body>'+
                    '<style> h3 { color: orange; font-size: 1rem}</style>'                
                  ))
      .addTo(this.mapa);
      marker_user.on('dragend',()=>{
        var lngLat = marker_user.getLngLat();
        this.latitud = lngLat.lat;
        this.longitud = lngLat.lng;

      })
      this.latitud = marker_user.getLngLat().lat;
      this.longitud = marker_user.getLngLat().lng;
      //console.log(marker_user.getLngLat().lat);

      
   
  
      const geocoder = new MapboxGeocoder({
        accessToken: Mapboxgl.accessToken,
        countries: 'ec',
        mapboxgl: Mapboxgl,
        zoom: 15,
        marker: {color:'blue'},
        placeholder: "Buscar",
        language: 'es-EC',
        
      });    
      this.mapa.addControl(geocoder);
     // document.getElementById('geocoder').appendChild(geocoder.onAdd(this.mapa));   

     const geolocalizacion = new Mapboxgl.GeolocateControl({
        positionOptions: {enableHighAccuracy: true},
        trackUserLocation: true,      
      });
      this.mapa.addControl(geolocalizacion);
     }).catch((error) => {
       console.log('Error al capturar su ubicación', error);
    });
    
  }


  guardar_marcador(){
      //console.log('esta es la posicion del marcador',this.latitud +' ' + this.longitud);
      this.mapaDatosService.latitud = this.latitud;
      this.mapaDatosService.longitud = this.longitud;
      this.mapaDatosService.marcador_guardado = true;
      console.log('la posicion del marcador en lat: '+this.mapaDatosService.latitud);
      console.log('la posicion del marcador en lng: '+this.mapaDatosService.longitud);
      //this.marcadorGuardado();
      this.alertsService.presentToast("Marcador guardado");

  }

  
  async marcadorGuardado() {
    const alert = await this.alertController.create({
      header: 'Guardado exitoso',
      message: '<hr>'+'<STRONG>La ubicación se guardó con éxito. </strong>',
      buttons: ['OK']
    });

    await alert.present();
  }



  async closeModal() {
    Mapboxgl.clearStorage();
    await this.modalController.dismiss();
    
  }

}
