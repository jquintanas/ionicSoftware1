import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FavoritosService } from './core/services/cart/favoritos.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TokenInterceptorService } from "src/app/core/services/interceptor/token-interceptor.service";
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';
import { DetallesProductosPageModule } from "src/app/pages/detalles-productos/detalles-productos.module";
// import { NgxSpinnerModule } from "ngx-spinner";
import { Camera } from '@ionic-native/camera/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    DetallesProductosPageModule
    // NgxSpinnerModule
  ],
  providers: [
    NativeStorage,
    Camera,
    GooglePlus,
    FirebaseAuthentication,
    FavoritosService,
    StatusBar,
    Facebook,
    SplashScreen,
    UserInfoService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    Geolocation,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
