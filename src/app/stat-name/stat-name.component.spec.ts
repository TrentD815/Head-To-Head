import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatNameComponent } from './stat-name.component';

describe('StatNameComponent', () => {
  let component: StatNameComponent;
  let fixture: ComponentFixture<StatNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
