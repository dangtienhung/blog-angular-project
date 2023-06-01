import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashTagEditComponent } from './hash-tag-edit.component';

describe('HashTagEditComponent', () => {
  let component: HashTagEditComponent;
  let fixture: ComponentFixture<HashTagEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HashTagEditComponent]
    });
    fixture = TestBed.createComponent(HashTagEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
