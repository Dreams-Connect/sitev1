import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContentproviderPage } from './contentprovider.page';

describe('ContentproviderPage', () => {
  let component: ContentproviderPage;
  let fixture: ComponentFixture<ContentproviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentproviderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentproviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
