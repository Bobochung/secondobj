import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDatailComponent } from './blog-datail.component';

describe('BlogDatailComponent', () => {
  let component: BlogDatailComponent;
  let fixture: ComponentFixture<BlogDatailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogDatailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
