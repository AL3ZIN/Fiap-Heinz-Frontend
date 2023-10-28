import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagemPageComponent } from './postagem-page.component';

describe('PostagemPageComponent', () => {
  let component: PostagemPageComponent;
  let fixture: ComponentFixture<PostagemPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostagemPageComponent]
    });
    fixture = TestBed.createComponent(PostagemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
