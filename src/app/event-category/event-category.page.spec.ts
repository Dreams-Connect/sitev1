import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventCategoryPage } from './event-category.page';

describe('EventCategoryPage', () => {
  let component: EventCategoryPage;
  let fixture: ComponentFixture<EventCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
