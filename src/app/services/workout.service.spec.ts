import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { User } from '../models/workout';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutService]
    });
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new user', () => {
    const newUser: User = {
      id: 4,
      name: 'Pratik Gaikwad',
      workouts: [
        { type: 'Running', minutes: 25 },
        { type: 'Swimming', minutes: 30 },
      ],
    };

    service.addUser(newUser);

    // Assert that the new user is added to the users array
    expect(service.users.length).toBe(4); // Assuming you initially had 3 users
    expect(service.users[3]).toEqual(newUser); // Check if the last user in the array matches newUser
  });
});

