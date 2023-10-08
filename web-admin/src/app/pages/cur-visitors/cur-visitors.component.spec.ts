import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurVisitorsComponent } from './cur-visitors.component';

describe('CurVisitorsComponent', () => {
  let component: CurVisitorsComponent;
  let fixture: ComponentFixture<CurVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
