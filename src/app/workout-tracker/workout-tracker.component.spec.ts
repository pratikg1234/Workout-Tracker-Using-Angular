import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutTrackerComponent } from './workout-tracker.component';
import { WorkoutService } from '../services/workout.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WorkoutTrackerComponent', () => {
  let component: WorkoutTrackerComponent;
  let fixture: ComponentFixture<WorkoutTrackerComponent>;
  let workoutServiceMock: WorkoutService;
  let snackBarMock: any;
  let routerMock: any;

  beforeEach(async () => {
    workoutServiceMock = {
      users: [],
      addUser: jasmine.createSpy('addUser').and.callFake((user: any) => {
        workoutServiceMock.users.push(user);
      }),
    };

    snackBarMock = {
      open: jasmine.createSpy('open'),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new workout for an existing user', () => {
    workoutServiceMock.users = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [],
      },
    ];

    component.userName = 'John Doe';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

    component.addWorkout();

    expect(workoutServiceMock.users[0].workouts.length).toBe(1);
    expect(workoutServiceMock.users[0].workouts[0]).toEqual({
      type: 'Running',
      minutes: 30,
    });
    expect(snackBarMock.open).toHaveBeenCalledWith(
      'Workout details added for John Doe',
      'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
      }
    );
  });

  it('should show a snackbar when the same workout type exists for a user', () => {
    workoutServiceMock.users = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [{ type: 'Running', minutes: 30 }],
      },
    ];

    component.userName = 'John Doe';
    component.workoutType = 'Running';
    component.workoutMinutes = 20;

    component.addWorkout();

    expect(workoutServiceMock.users[0].workouts.length).toBe(2);
    expect(snackBarMock.open).toHaveBeenCalledWith(
      'This workout type already exists for John Doe',
      'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
      }
    );
  });

  it('should create a new user and add a workout if the user does not exist', () => {
    component.userName = 'Jane Doe';
    component.workoutType = 'Cycling';
    component.workoutMinutes = 45;

    component.addWorkout();

    expect(workoutServiceMock.addUser).toHaveBeenCalled();
    expect(workoutServiceMock.users.length).toBe(1);
    expect(workoutServiceMock.users[0]).toEqual({
      id: 1,
      name: 'Jane Doe',
      workouts: [{ type: 'Cycling', minutes: 45 }],
    });
    expect(snackBarMock.open).toHaveBeenCalledWith(
      'Workout details added for Jane Doe',
      'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
      }
    );
  });

  it('should navigate to workout details', () => {
    component.navigateToWorkoutDetails();
    expect(routerMock.navigate).toHaveBeenCalledWith([
      'workout-tracker/details',
    ]);
  });
});
