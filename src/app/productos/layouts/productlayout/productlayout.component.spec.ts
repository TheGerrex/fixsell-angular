import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlayoutComponent } from './productlayout.component';

describe('ProductlayoutComponent', () => {
  let component: ProductlayoutComponent;
  let fixture: ComponentFixture<ProductlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductlayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
