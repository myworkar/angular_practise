import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpeComponent } from './mpe.component';

describe('MpeComponent', () => {
  let component: MpeComponent;
  let fixture: ComponentFixture<MpeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
