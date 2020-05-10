import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DulcesPage } from './dulces.page';

describe('DulcesPage', () => {
  let component: DulcesPage;
  let fixture: ComponentFixture<DulcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DulcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DulcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
