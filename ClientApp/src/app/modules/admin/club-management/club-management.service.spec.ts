import { TestBed } from '@angular/core/testing';

import { ClubManagementService } from './club-management.service';

describe('ClubManagementService', () => {
  let service: ClubManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
