import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeSkill } from './add-employee-skill';

describe('AddEmployeeSkill', () => {
  let component: AddEmployeeSkill;
  let fixture: ComponentFixture<AddEmployeeSkill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeeSkill],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployeeSkill);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
