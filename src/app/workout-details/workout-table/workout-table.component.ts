import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
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

/** Constants used to fill up our data base. */
@Component({
  selector: 'app-workout-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
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

  constructor(private WorkoutService: WorkoutService) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.getUsers());
    // console.log('datasourse', this.dataSource);
    console.log("users: ", this.users)
  }

  ngOnChanges(){
    this.dataSource = new MatTableDataSource(this.getUsers());
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
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
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     name: name,
//     workouts:workouts,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }
