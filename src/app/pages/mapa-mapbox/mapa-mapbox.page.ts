import { MapaDatosService } from './../../services/mapa-datos/mapa-datos.service';
import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment} from './../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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
  nuevoMarcador: Mapboxgl.Marker;
  crear = true;
  eliminar = false;
  guardar = false;
  constructor(private modalController: ModalController, public alertController: AlertController, private mapaDatosService: MapaDatosService) { }

  ngOnInit() {
    (Mapboxgl as any).accessToken = environment.mapboxkey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.5419038,-1.8017518], // starting position
      zoom: 13 // starting zoom
    });
    this.mapa.on('load', ()=> {
      this.mapa.resize();
      
    });
    
    const marker_omipali = new Mapboxgl.Marker({draggable: false,color: 'red'})     
      .setLngLat([-79.5419038,-1.8017518])
      .setPopup(
        new Mapboxgl.Popup({ offset: 30 }) // add popups
          .setHTML('<h1> <STRONG>Omi&Pali</STRONG> </h1>'+
                    '<hr color="black">'+
                    '<p>'+'<STRONG>Pastelería </STRONG>'+'<style> h1 { color: #FF0000; font-size: 1rem}</style>')              
      )
      .addTo(this.mapa);

    const geolocalizacion = new Mapboxgl.GeolocateControl({
      positionOptions: {enableHighAccuracy: true},
      trackUserLocation: true,      
    });
    this.mapa.addControl(geolocalizacion);
    geolocalizacion.on('geolocate', function(e) {
      var lon = e.coords.longitude;
      var lat = e.coords.latitude
      var position = [lon, lat];
      console.log('posicion del usuario',position);
    });


    const geocoder = new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken,
      countries: 'ec',
      mapboxgl: Mapboxgl,
      zoom: 15,
      marker: {color:'green'},
      placeholder: "Buscar",
      language: 'es-EC',
      
    });    
   
    /*this.mapa.on('click', function(e) {
      console.log('A click event has occurred at ' + e.lngLat);
    });*/

    document.getElementById('geocoder').appendChild(geocoder.onAdd(this.mapa));   
    this.mapa.on('touchend',(e) => {
      var posicion = e.lngLat;
      this.latitud = posicion.lat;
      this.longitud = posicion.lng;
      this.mapaDatosService.latitud = this.latitud;
      this.mapaDatosService.longitud = this.longitud;
    });    
  }
  
  crear_marcador(){
    if(this.latitud != null || this.longitud != null){
      console.log(this.latitud+"--"+this.longitud);
      this.nuevoMarcador = new Mapboxgl.Marker({
        draggable : true,
        color:"orange"
      })
      .setLngLat([this.longitud,this.latitud])
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
      this.marcadroCreado();
      this.crear = false;
      this.eliminar = true;
      this.guardar = true;
      /*
       .setHTML('<h3 class="parah3"> Información </h3>'+
                  '<hr color="black">'+
                  '<p>'+'Este marcador indica su ubicación'+'</p>'+'<style> h3 { color: orange; font-size: 1rem}</style>'))
                  */
      console.log("marcador creado");
    }else{
      this.presentAlert(); 
    }
  }
  eliminar_marcador(){
    if(this.crear == false){
      this.nuevoMarcador.remove();
      this.marcadorEliminado();
      this.crear = true;
      this.eliminar = false;
    }
  }
  guardar_marcador(){
    if(this.crear == false){
      //console.log('esta es la posicion del marcador',this.latitud +' ' + this.longitud);
      this.mapaDatosService.latitud = this.latitud;
      this.mapaDatosService.longitud = this.longitud;
      this.mapaDatosService.marcador_guardado = true;
      //console.log('cuando el mouse dejo de tocar: '+this.mapaDatosService.latitud);
      //console.log('cuando el mouse dejo de tocar: '+this.mapaDatosService.longitud);
      this.marcadorGuardado();
    }else{
      this.infocreacion();
    }
  }

  async infocreacion() {
    const alert = await this.alertController.create({
      header: 'Error - Guardar Marcador',
      message: '<hr>'+'<STRONG>Para guardar un marcador, primero debe crearlo. </strong>',
      buttons: ['OK']
    });

    await alert.present();
  }
  async marcadorEliminado() {
    const alert = await this.alertController.create({
      header: 'Eliminación exitosa',
      message: '<hr>'+'<STRONG>Su marcador ha sido eliminado. </strong>',
      buttons: ['OK']
    });

    await alert.present();
  }
  async marcadroCreado() {
    const alert = await this.alertController.create({
      header: 'Confirmación de creación',
      message: '<hr>'+'<STRONG>Su marcador ha sido creado, puede desplazarlo a otro punto en el mapa.</strong>',
      buttons: ['OK']
    });

    await alert.present();
  }

  async marcadorGuardado() {
    const alert = await this.alertController.create({
      header: 'Guardado exitoso',
      message: '<hr>'+'<STRONG>La ubicación de su marcador se guardó con éxito. </strong>',
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error - Crear Marcador',
      message: '<hr>'+'<STRONG> Debe seleccionar un punto en el mapa y luego seleccione crear marcador </strong>',
      buttons: ['OK']
    });

    await alert.present();
  }

  async closeModal() {
    Mapboxgl.clearStorage();
    await this.modalController.dismiss();
    
  }

}
