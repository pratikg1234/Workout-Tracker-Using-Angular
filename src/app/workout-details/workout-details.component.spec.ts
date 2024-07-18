import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WorkoutDetailsComponent } from './workout-details.component';
import { WorkoutService } from '../services/workout.service';
import { User } from '../models/workout';

describe('WorkoutDetailsComponent', () => {
  let component: WorkoutDetailsComponent;
  let fixture: ComponentFixture<WorkoutDetailsComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    // Create a mock WorkoutService with a spy on getUsers method
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['getUsers']);
    
    // Configure the TestBed module
    await TestBed.configureTestingModule({
      imports: [], // Add any necessary imports here
      providers: [{ provide: WorkoutService, useValue: mockWorkoutService }],
    }).compileComponents();

    // Create instance of component and fixture
    fixture = TestBed.createComponent(WorkoutDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users by search term', () => {
    // Mock data
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', workouts: [] },
      { id: 2, name: 'Jane Smith', workouts: [] },
    ];
    mockWorkoutService.users = mockUsers;

    // Set search term and call search method
    component.searchTerm = 'Jane';
    component.search();

    // Expect filteredUsers to contain only 'Jane Smith'
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toEqual('Jane Smith');
  });

  it('should filter users by workout type', () => {
    // Mock data
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 45 }] },
    ];
    mockWorkoutService.users = mockUsers;

    // Set workout type and call filter method
    component.selectedWorkoutType = 'Swimming';
    component.filter();

    // Expect filteredUsers to contain only 'Jane Smith'
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toEqual('Jane Smith');
  });

});
