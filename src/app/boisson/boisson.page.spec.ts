import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoissonPage } from './boisson.page';

describe('BoissonPage', () => {
  let component: BoissonPage;
  let fixture: ComponentFixture<BoissonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BoissonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
