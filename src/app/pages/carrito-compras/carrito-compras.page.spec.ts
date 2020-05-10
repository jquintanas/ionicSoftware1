import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarritoComprasPage } from './carrito-compras.page';

describe('CarritoComprasPage', () => {
  let component: CarritoComprasPage;
  let fixture: ComponentFixture<CarritoComprasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarritoComprasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
