import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditshirtComponent } from './editshirt.component';

describe('EditshirtComponent', () => {
  let component: EditshirtComponent;
  let fixture: ComponentFixture<EditshirtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditshirtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditshirtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
