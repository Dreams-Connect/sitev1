import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeeditemPage } from './feeditem.page';

describe('FeeditemPage', () => {
  let component: FeeditemPage;
  let fixture: ComponentFixture<FeeditemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeditemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeeditemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
