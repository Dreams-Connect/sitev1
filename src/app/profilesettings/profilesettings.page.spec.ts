import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilesettingsPage } from './profilesettings.page';

describe('ProfilesettingsPage', () => {
  let component: ProfilesettingsPage;
  let fixture: ComponentFixture<ProfilesettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesettingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilesettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
