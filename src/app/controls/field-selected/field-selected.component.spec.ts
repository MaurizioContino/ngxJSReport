import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSelectedComponent } from './field-selected.component';

describe('FieldSelectedComponent', () => {
  let component: FieldSelectedComponent;
  let fixture: ComponentFixture<FieldSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldSelectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
