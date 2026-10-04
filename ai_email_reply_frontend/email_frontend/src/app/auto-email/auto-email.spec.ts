import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoEmail } from './auto-email';

describe('AutoEmail', () => {
  let component: AutoEmail;
  let fixture: ComponentFixture<AutoEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoEmail],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoEmail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
