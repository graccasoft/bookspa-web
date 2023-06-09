import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservePublicComponent } from './reserve-public.component';

describe('ReservePublicComponent', () => {
  let component: ReservePublicComponent;
  let fixture: ComponentFixture<ReservePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservePublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
