import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DceventPage } from './dcevent.page';

describe('DceventPage', () => {
  let component: DceventPage;
  let fixture: ComponentFixture<DceventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DceventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DceventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
