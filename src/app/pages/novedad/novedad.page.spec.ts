import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovedadPage } from './novedad.page';

describe('NovedadPage', () => {
  let component: NovedadPage;
  let fixture: ComponentFixture<NovedadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovedadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovedadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
