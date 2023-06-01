import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashTagAddComponent } from './hash-tag-add.component';

describe('HashTagAddComponent', () => {
  let component: HashTagAddComponent;
  let fixture: ComponentFixture<HashTagAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HashTagAddComponent]
    });
    fixture = TestBed.createComponent(HashTagAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
