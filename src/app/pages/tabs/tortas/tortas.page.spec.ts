import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TortasPage } from './tortas.page';

describe('TortasPage', () => {
  let component: TortasPage;
  let fixture: ComponentFixture<TortasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TortasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TortasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
