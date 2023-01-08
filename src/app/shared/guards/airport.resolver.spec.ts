import { TestBed } from '@angular/core/testing';

import { AirportResolver } from './airport.resolver';

describe('AirportResolver', () => {
  let resolver: AirportResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AirportResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
