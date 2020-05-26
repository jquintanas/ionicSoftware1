import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapaMapboxPage } from './mapa-mapbox.page';

describe('MapaMapboxPage', () => {
  let component: MapaMapboxPage;
  let fixture: ComponentFixture<MapaMapboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaMapboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaMapboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
