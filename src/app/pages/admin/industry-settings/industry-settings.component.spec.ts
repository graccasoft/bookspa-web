import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrySettingsComponent } from './industry-settings.component';

describe('IndustrySettingsComponent', () => {
  let component: IndustrySettingsComponent;
  let fixture: ComponentFixture<IndustrySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrySettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
