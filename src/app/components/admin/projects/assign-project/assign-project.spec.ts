import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProject } from './assign-project';

describe('AssignProject', () => {
  let component: AssignProject;
  let fixture: ComponentFixture<AssignProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignProject],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
