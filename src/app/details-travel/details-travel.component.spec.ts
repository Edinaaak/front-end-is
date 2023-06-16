import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTravelComponent } from './details-travel.component';

describe('DetailsTravelComponent', () => {
  let component: DetailsTravelComponent;
  let fixture: ComponentFixture<DetailsTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
