# WorkoutTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

**Unit Testing Report**
I have attched the unit tests for each of the component & service files.
![image](https://github.com/user-attachments/assets/bbe594a1-16ff-4551-b858-eb4b3a7ea0f2)

**Assumptions**
1. While adding workout details for user if user already exists, then it will not get added again and only its workout type & workout minutes gets added.
2. If user exits while adding & workout type also exits then it will add only workout minutes.
3. All the fields username, workout type and workout minutes are mandatory.
4. While showing the workout progress in chart by default first user will be selected everytime.

**Folder Structure Of the Project**
  1. Index.html is the starting point of the project. Then it goes to app component & then to specifix routes defined.
  2. After going in Workout-Tracker-Using-Angular/src/app/ there are total 5 folders.
  3. In the models folder there is a model for workout.
  4. In the services folder, in workoutService we are storing the new users as they adds.
  5. In the workout-tracker folder, workout-tracker component is there for adding new users in the service file.
  6. In workout-details folder, workout-details component is there for search & filter functionality.
  7. Inside workout-table folder, workout-table component for showing the workout data of users in tabular format.
  8. Inside workout-chart folder, workout-chart component for displaying the workout progress report in the form chart for particular user.
