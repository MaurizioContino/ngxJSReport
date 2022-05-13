import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DBLoginComponent } from './dblogin.component';

describe('DBLoginComponent', () => {
  let component: DBLoginComponent;
  let fixture: ComponentFixture<DBLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DBLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DBLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
