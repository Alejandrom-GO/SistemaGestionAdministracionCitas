import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdminAreaComponent } from './panel-admin-area.component';

describe('PanelAdminAreaComponent', () => {
  let component: PanelAdminAreaComponent;
  let fixture: ComponentFixture<PanelAdminAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAdminAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdminAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
