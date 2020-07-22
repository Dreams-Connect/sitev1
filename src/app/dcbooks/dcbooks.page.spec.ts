import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DcbooksPage } from './dcbooks.page';

describe('DcbooksPage', () => {
  let component: DcbooksPage;
  let fixture: ComponentFixture<DcbooksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcbooksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DcbooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
