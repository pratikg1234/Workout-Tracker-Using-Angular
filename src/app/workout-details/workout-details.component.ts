import { Component } from '@angular/core';
import { User, Workout } from '../models/workout';
import { WorkoutService } from '../services/workout.service';
import { CommonModule } from '@angular/common';
import { WorkoutTableComponent } from "./workout-table/workout-table.component";
@Component({
  selector: 'app-workout-details',
  standalone: true,
  imports: [CommonModule, WorkoutTableComponent],
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
  constructor(private workoutService: WorkoutService) {
    // this.users = this.workoutService.getUsers();
    this.filteredUsers = this.users;
  }

  search() {
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  filter() {
    this.filteredUsers = this.users.filter((user) =>
      user.workouts.some((workout) =>
        workout.type.toLowerCase().includes(this.filterTerm.toLowerCase())
      )
    );
  }
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredUsers.slice(start, end);
  }

  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    this.currentPage--;
  }
}
