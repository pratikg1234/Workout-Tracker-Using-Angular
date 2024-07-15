import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutTrackerComponent } from './workout-tracker/workout-tracker.component';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';

export const routes: Routes = [
  { path: 'workout-tracker', component: WorkoutTrackerComponent },
  { path: '', redirectTo: '/workout-tracker', pathMatch: 'full' },
  { path: 'workout-tracker/details', component:WorkoutDetailsComponent}
];


