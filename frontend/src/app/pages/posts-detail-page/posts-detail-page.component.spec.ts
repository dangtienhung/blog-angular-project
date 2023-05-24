import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsDetailPageComponent } from './posts-detail-page.component';

describe('PostsDetailPageComponent', () => {
  let component: PostsDetailPageComponent;
  let fixture: ComponentFixture<PostsDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsDetailPageComponent]
    });
    fixture = TestBed.createComponent(PostsDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
