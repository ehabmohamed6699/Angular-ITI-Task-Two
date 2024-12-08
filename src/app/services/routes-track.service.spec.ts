import { TestBed } from '@angular/core/testing';

import { RoutesTrackService } from './routes-track.service';

describe('RoutesTrackService', () => {
  let service: RoutesTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
