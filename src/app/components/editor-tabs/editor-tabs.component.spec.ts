import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTabsComponent } from './editor-tabs.component';

describe('EditorTabsComponent', () => {
  let component: EditorTabsComponent;
  let fixture: ComponentFixture<EditorTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
