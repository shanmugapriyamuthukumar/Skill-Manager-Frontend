import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSkill } from './delete-skill';

describe('DeleteSkill', () => {
  let component: DeleteSkill;
  let fixture: ComponentFixture<DeleteSkill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSkill],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteSkill);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
