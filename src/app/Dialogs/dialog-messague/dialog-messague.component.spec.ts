import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessagueComponent } from './dialog-messague.component';

describe('DialogMessagueComponent', () => {
  let component: DialogMessagueComponent;
  let fixture: ComponentFixture<DialogMessagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogMessagueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMessagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
