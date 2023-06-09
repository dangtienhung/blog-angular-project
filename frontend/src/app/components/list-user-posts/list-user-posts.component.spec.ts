import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserPostsComponent } from './list-user-posts.component';

describe('ListUserPostsComponent', () => {
  let component: ListUserPostsComponent;
  let fixture: ComponentFixture<ListUserPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUserPostsComponent]
    });
    fixture = TestBed.createComponent(ListUserPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
