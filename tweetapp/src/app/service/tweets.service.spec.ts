import { TestBed } from '@angular/core/testing';

import { AllTweetsService } from './tweets.service';

describe('AllTweetsService', () => {
  let service: AllTweetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllTweetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
