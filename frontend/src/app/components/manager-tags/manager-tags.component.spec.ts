import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTagsComponent } from './manager-tags.component';

describe('ManagerTagsComponent', () => {
  let component: ManagerTagsComponent;
  let fixture: ComponentFixture<ManagerTagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerTagsComponent]
    });
    fixture = TestBed.createComponent(ManagerTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
