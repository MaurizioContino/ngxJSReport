import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HavingComponent } from './having.component';

describe('HavingComponent', () => {
  let component: HavingComponent;
  let fixture: ComponentFixture<HavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HavingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
