import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllEventPage } from './all-event.page';

describe('AllEventPage', () => {
  let component: AllEventPage;
  let fixture: ComponentFixture<AllEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
