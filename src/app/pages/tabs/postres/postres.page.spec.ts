import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostresPage } from './postres.page';

describe('PostresPage', () => {
  let component: PostresPage;
  let fixture: ComponentFixture<PostresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
