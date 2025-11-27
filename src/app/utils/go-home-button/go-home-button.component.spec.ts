import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoHomeButtonComponent } from './go-home-button.component';

describe('GoHomeButtonComponent', () => {
  let component: GoHomeButtonComponent;
  let fixture: ComponentFixture<GoHomeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoHomeButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoHomeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
