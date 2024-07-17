import { Component } from '@angular/core';
import { User, Workout } from '../models/workout';
import { WorkoutService } from '../services/workout.service';
import { CommonModule } from '@angular/common';
import { WorkoutTableComponent } from './workout-table/workout-table.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-workout-details',
  standalone: true,
  imports: [
    CommonModule,
    WorkoutTableComponent,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.css',
})
export class WorkoutDetailsComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  filterTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  workoutTypes = ['All','Swimming', 'Running', 'Yoga', 'Cycling'];
  selectedWorkoutType: string = '';
  constructor(private workoutService: WorkoutService) {
    // this.users = this.workoutService.getUsers();
    this.filteredUsers = this.workoutService.users;
  }

  search() {
    this.filteredUsers = this.workoutService.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log('this.filteredUsers', this.filteredUsers);
    if (!this.searchTerm) {
    }
    if (this.selectedWorkoutType) {
      this.filter();
    }
  }

  filter() {
    console.log('this.selectedWorkoutType', this.selectedWorkoutType);
    if (this.selectedWorkoutType !== 'All') {
      this.filteredUsers = this.filteredUsers.filter((user) =>
        user.workouts.some(
          (workout) => workout.type === this.selectedWorkoutType
        )
      );
    } else if (this.selectedWorkoutType === 'All') {
      this.filteredUsers = this.filteredUsers;
    }
  }
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredUsers.slice(start, end);
  }

  // nextPage() {
  //   this.currentPage++;
  // }

  // previousPage() {
  //   this.currentPage--;
  // }
}
