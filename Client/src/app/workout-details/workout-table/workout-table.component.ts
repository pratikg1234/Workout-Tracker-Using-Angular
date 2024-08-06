import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorkoutService } from '../../services/workout.service';
import { User } from '../../models/workout';

export interface UserData {
  name: string;
  workouts: string;
  numberOfWorkouts: number;
  totalWorkoutMinutes: number;
}

@Component({
  selector: 'app-workout-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CdkTableModule,
  ],
  templateUrl: './workout-table.component.html',
  styleUrl: './workout-table.component.css',
})
export class WorkoutTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'workouts',
    'numberOfWorkouts',
    'totalWorkoutMinutes',
  ];
  dataSource: MatTableDataSource<UserData>;

  @Input() users: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private workoutService: WorkoutService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.getUsers());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users'] && changes['users'].currentValue) {
      this.dataSource.data = this.getUsers();
    }
  }
  //Pagination
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //To convert users in the mat-table format to display on the table
  getUsers() {
    return this.users.map((user) => {
      const numberOfWorkouts = user.workouts.length;
      const totalWorkoutMinutes = user.workouts.reduce(
        (sum, workout) => sum + workout.minutes,
        0
      );

      const workouts = user.workouts.map((workout) => workout.type).join(', ');
      return {
        name: user.name,
        workouts: workouts,
        numberOfWorkouts: numberOfWorkouts,
        totalWorkoutMinutes: totalWorkoutMinutes,
      };
    });
  }
}
