import { Injectable } from '@angular/core';
import { User } from '../models/workout';
@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 },
      ],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 },
      ],
    },
  ];
  constructor() {}
  getUsers() {
    return this.users.map(user => {
      const numberOfWorkouts = user.workouts.length;
      const totalWorkoutMinutes = user.workouts.reduce((sum, workout) => sum + workout.minutes, 0);
      const workouts = user.workouts.map(workout => workout.type).join(', ');

      return {
        name: user.name,
        workouts: workouts,
        numberOfWorkouts: numberOfWorkouts,
        totalWorkoutMinutes: totalWorkoutMinutes
      };
    });
  }

  addUser(user: User) {
    this.users.push(user);
  }
  
}
