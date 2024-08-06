import { Injectable } from '@angular/core';
import { User } from '../models/workout';
@Injectable({
  providedIn: 'root',
})

//Created the three dummy users
export class WorkoutService {
  public users: User[] = [
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

  //For adding new user
  addUser(user: User) {
    this.users.push(user);
  }
}
