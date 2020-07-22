import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DccoursesPage } from './dccourses.page';

describe('DccoursesPage', () => {
  let component: DccoursesPage;
  let fixture: ComponentFixture<DccoursesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DccoursesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DccoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
