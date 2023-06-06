import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBlogComponent } from './history-blog.component';

describe('HistoryBlogComponent', () => {
  let component: HistoryBlogComponent;
  let fixture: ComponentFixture<HistoryBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryBlogComponent]
    });
    fixture = TestBed.createComponent(HistoryBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
