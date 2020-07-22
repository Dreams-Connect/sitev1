import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateformPage } from './updateform.page';

describe('UpdateformPage', () => {
  let component: UpdateformPage;
  let fixture: ComponentFixture<UpdateformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
