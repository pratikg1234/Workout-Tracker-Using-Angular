import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../services/workout.service';
import { User, Workout } from '../models/workout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
@Component({
  selector: 'app-workout-tracker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './workout-tracker.component.html',
  styleUrl: './workout-tracker.component.css',
})
export class WorkoutTrackerComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedValue: string = '';
  workoutTypes = ['Swimming', 'Running', 'Yoga', 'Cycling'];

  constructor(private workoutService: WorkoutService, private router: Router) {
    // this.users = this.workoutService.getUsers();
  }

  addWorkout() {
    const newUser: User = {
      id: Math.floor(Math.random() * 1000),
      name: this.userName,
      workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }],
    };
    this.workoutService.addUser(newUser);
    // this.users = this.workoutService.getUsers();
  }
  //for navigating to the workout deatils page
  navigateToWorkoutDetails() {
    this.router.navigate(['workout-tracker/details']);
  }
}
