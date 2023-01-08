import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportListComponent } from './airport-list.component';

describe('AirportsComponent', () => {
  let component: AirportListComponent;
  let fixture: ComponentFixture<AirportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
