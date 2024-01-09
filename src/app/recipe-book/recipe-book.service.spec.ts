import { TestBed } from '@angular/core/testing';

import { RecipeBookService as RecipeBookService } from './recipe-book.service';

describe('RecipeService', () => {
  let service: RecipeBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
