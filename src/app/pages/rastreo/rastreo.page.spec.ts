import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RastreoPage } from './rastreo.page';

describe('RastreoPage', () => {
  let component: RastreoPage;
  let fixture: ComponentFixture<RastreoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RastreoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RastreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
