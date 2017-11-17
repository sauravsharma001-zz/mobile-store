import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInstanceComponent } from './mobile-instance.component';

describe('MobileInstanceComponent', () => {
  let component: MobileInstanceComponent;
  let fixture: ComponentFixture<MobileInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
