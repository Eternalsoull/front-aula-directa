import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMenuSidebarComponent } from './layout-menu-sidebar.component';

describe('LayoutMenuSidebarComponent', () => {
  let component: LayoutMenuSidebarComponent;
  let fixture: ComponentFixture<LayoutMenuSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutMenuSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutMenuSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
