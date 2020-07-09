import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SophomorePage } from './sophomore.page';

describe('SophomorePage', () => {
  let component: SophomorePage;
  let fixture: ComponentFixture<SophomorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SophomorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SophomorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
