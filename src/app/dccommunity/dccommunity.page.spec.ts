import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DccommunityPage } from './dccommunity.page';

describe('DccommunityPage', () => {
  let component: DccommunityPage;
  let fixture: ComponentFixture<DccommunityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DccommunityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DccommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
