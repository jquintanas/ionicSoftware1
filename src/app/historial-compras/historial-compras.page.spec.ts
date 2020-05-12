import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorialComprasPage } from './historial-compras.page';

describe('HistorialComprasPage', () => {
  let component: HistorialComprasPage;
  let fixture: ComponentFixture<HistorialComprasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialComprasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
