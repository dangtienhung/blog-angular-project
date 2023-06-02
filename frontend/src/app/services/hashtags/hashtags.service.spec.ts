import { TestBed } from '@angular/core/testing';

import { HashtagsService } from './hashtags.service';

describe('HashtagsService', () => {
  let service: HashtagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashtagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
