import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservePublicConfirmationComponent } from './reserve-public-confirmation.component';

describe('ReservePublicConfirmationComponent', () => {
  let component: ReservePublicConfirmationComponent;
  let fixture: ComponentFixture<ReservePublicConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservePublicConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservePublicConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
