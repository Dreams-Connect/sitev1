import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DcpodcastPage } from './dcpodcast.page';

describe('DcpodcastPage', () => {
  let component: DcpodcastPage;
  let fixture: ComponentFixture<DcpodcastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpodcastPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DcpodcastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
