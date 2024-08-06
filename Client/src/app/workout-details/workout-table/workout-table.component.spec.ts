import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WorkoutTableComponent, UserData } from './workout-table.component';
import { User } from '../../models/workout';
import { WorkoutService } from '../../services/workout.service';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('WorkoutTableComponent', () => {
  let component: WorkoutTableComponent;
  let fixture: ComponentFixture<WorkoutTableComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    // Create a mock WorkoutService with a spy on getUsers method
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['getUsers']);
    
    // Configure the TestBed module
    await TestBed.configureTestingModule({
      imports: [MatPaginatorModule], // Import necessary modules for testing
      providers: [{ provide: WorkoutService, useValue: mockWorkoutService }],
      declarations: [], // Remove WorkoutTableComponent from declarations
    }).compileComponents();

    // Create instance of component and fixture
    fixture = TestBed.createComponent(WorkoutTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set up pagination on ngAfterViewInit', () => {
    // Mock MatPaginator instance
    const mockPaginator = jasmine.createSpyObj('MatPaginator', ['ngAfterViewInit']);
    component.paginator = mockPaginator;

    // Call ngAfterViewInit method
    component.ngAfterViewInit();

    // Assert that dataSource.paginator is set to mockPaginator
    expect(component.dataSource.paginator).toBe(mockPaginator);
  });

  it('should transform users into UserData format in getUsers method', () => {
    // Mock data
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
    ];
    component.users = mockUsers;

    // Call getUsers method
    const transformedData: UserData[] = component.getUsers();

    // Assert the transformation logic
    expect(transformedData.length).toBe(2); // Assuming two users
    expect(transformedData[0].name).toBe('John Doe');
    expect(transformedData[0].workouts).toBe('Running, Cycling');
    expect(transformedData[0].numberOfWorkouts).toBe(2); // Two workouts
    expect(transformedData[0].totalWorkoutMinutes).toBe(75); // 30 + 45 = 75 minutes
  });

});
