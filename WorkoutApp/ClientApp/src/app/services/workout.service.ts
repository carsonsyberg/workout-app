import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Workout } from '../classes/workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  public workouts: Workout[] = [];
  constructor(private http: HttpClient) {
  }

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>('https://localhost:7040/api/Workout/GetWorkouts');
  }

  getWorkoutById(id: string): Observable<Workout> {
    return this.http.get<Workout>('https://localhost:7040/api/Workout/GetWorkoutById/' + id);
  }

  createWorkout(newWorkout: Workout): Observable<Workout> {
    console.log(newWorkout);
    return this.http.post<Workout>('https://localhost:7040/api/Workout/CreateWorkout', newWorkout);
  }

  editWorkout(updatedWorkoutId: string, updatedWorkout: Workout): Observable<Workout> {
    console.log(updatedWorkout);
    return this.http.put<Workout>('https://localhost:7040/api/Workout/EditWorkout/' + updatedWorkoutId, updatedWorkout);
  }

  deleteWorkout(deleteWorkoutId: string): Observable<any> {
    return this.http.delete<any>('https://localhost:7040/api/Workout/DeleteWorkout/' + deleteWorkoutId);
  }

  setFavoriteWorkout(workout: Workout): Observable<boolean> {
    return this.http.put<boolean>('https://localhost:7040/api/Workout/SetFavoriteWorkout', workout);
  }

  getFavoriteWorkout(): Observable<Workout> {
    return this.http.get<Workout>('https://localhost:7040/api/Workout/GetFavoriteWorkout');
  }
}
