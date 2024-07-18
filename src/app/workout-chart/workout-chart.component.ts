import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { WorkoutService } from '../services/workout.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, MatCardModule, MatListModule],
  providers: [provideEcharts()],
  templateUrl: './workout-chart.component.html',
  styleUrl: './workout-chart.component.css',
})
export class WorkoutChartComponent {
  users: string[] = [];
  chartOptions: EChartsOption = {};
  selectedUser: any;
  workoutArray: any;
  constructor(private workoutservice: WorkoutService) {
    this.users = this.workoutservice.users.map((user) => user.name);
    //when the page loades for first time then we have to show the chart of first user
    this.workoutArray = this.workoutservice.users[0].workouts;
    const aggregatedWorkouts = this.aggregateWorkouts(this.workoutArray);
    this.updateChartOptions(aggregatedWorkouts);
    //when the page loades for first time then we have to show Tile of Furst User 
    if (!this.selectedUser) {
      this.selectedUser = this.users[0];
      this.chartOptions = {
        ...this.chartOptions,
        title: {
          text: `${this.selectedUser}'s Workout Progress`,
          textStyle: {
            fontSize: 30,
          },
        },
      };
    }
  }
  ngOnInit() {}

  //Function To Handle Which Chart To Show When User Clicks On Different Users
  selectUser(user: string) {
    this.selectedUser = user;

    //We have to find the user which we have selected from list from the workoutservice users
    const selectedUserData = this.workoutservice.users.find(
      (u) => u.name === user
    );
    if (selectedUserData) {
      this.workoutArray = selectedUserData.workouts;
    }

    const aggregatedWorkouts = this.aggregateWorkouts(this.workoutArray);
    this.updateChartOptions(aggregatedWorkouts);
    this.chartOptions = {
      ...this.chartOptions,
      title: {
        text: `${this.selectedUser}'s Workout Progress`,
        textStyle: {
          fontSize: 30,
        },
      },
    };
  }

  //Funstion to store only one workout array of abjects even if the workout type is same for each user
  aggregateWorkouts(
    workouts: { type: string; minutes: number }[]
  ): { type: string; minutes: number }[] {
    const workoutMap = new Map<string, number>();

    workouts.forEach((workout) => {
      if (workoutMap.has(workout.type)) {
        workoutMap.set(
          workout.type,
          workoutMap.get(workout.type)! + workout.minutes
        );
      } else {
        workoutMap.set(workout.type, workout.minutes);
      }
    });

    return Array.from(workoutMap, ([type, minutes]) => ({ type, minutes }));
  }

  // main function of making chart options
  updateChartOptions(
    aggregatedWorkouts: { type: string; minutes: number }[]
  ): void {
    this.chartOptions = {
      title: {
        text: ' Workout Progress',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Minutes'],
        top: '5%',
        left: 'center',
      },
      dataZoom: {
        show: true,
        type: 'inside',
      },
      xAxis: {
        type: 'category',
        data: aggregatedWorkouts.map((workout) => workout.type),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Minutes',
          data: aggregatedWorkouts.map((workout) => workout.minutes),
          type: 'bar',
          itemStyle: {
            color: '#36A2EB',
          },
        },
      ],
    };
  }
}
