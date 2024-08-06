import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WorkoutChartComponent } from './workout-chart.component';
import { WorkoutService } from '../services/workout.service';
import { EChartsOption } from 'echarts';

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    // Create a mock WorkoutService with mock users
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['getUsers']);
    mockWorkoutService.users = [
      {
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 },
        ],
        id: 1,
      },
      {
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 },
        ],
        id: 2,
      },
    ];

    await TestBed.configureTestingModule({
      imports: [], // Add any necessary imports here
      providers: [{ provide: WorkoutService, useValue: mockWorkoutService }],
      declarations: [], // Remove WorkoutChartComponent from declarations
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit and constructor logic
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with first user data', () => {
    // Check initial chartOptions and selectedUser
    expect(component.chartOptions).toBeTruthy();
    expect(component.selectedUser).toBe('John Doe');
    expect(component.workoutArray).toEqual([
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 },
    ]);
  });

  it('should update chartOptions and selectedUser when selectUser is called', () => {
    // Simulate selecting Jane Smith
    component.selectUser('Jane Smith');

    // Check updated chartOptions and selectedUser
    expect(component.selectedUser).toBe('Jane Smith');
    expect(component.workoutArray).toEqual([
      { type: 'Swimming', minutes: 60 },
      { type: 'Running', minutes: 20 },
    ]);
  });

  it('should aggregate workouts correctly in aggregateWorkouts method', () => {
    // Mock data
    const workouts = [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 },
      { type: 'Running', minutes: 20 },
    ];

    // Call aggregateWorkouts method
    const aggregatedWorkouts = component.aggregateWorkouts(workouts);

    // Check the aggregated result
    expect(aggregatedWorkouts.length).toBe(2); // Two unique types: Running and Cycling
    expect(aggregatedWorkouts).toContain(
      jasmine.objectContaining({ type: 'Running', minutes: 50 })
    );
    expect(aggregatedWorkouts).toContain(
      jasmine.objectContaining({ type: 'Cycling', minutes: 45 })
    );
  });
});
