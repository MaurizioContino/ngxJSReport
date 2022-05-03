import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinIconsComponent } from './join-icons.component';

describe('JoinIconsComponent', () => {
  let component: JoinIconsComponent;
  let fixture: ComponentFixture<JoinIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
