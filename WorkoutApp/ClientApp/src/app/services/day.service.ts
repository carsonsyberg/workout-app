import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Day } from '../classes/day';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  public days: Day[] = [];
  constructor(private http: HttpClient) {
  }

  getDays(): Observable<Day[]> {
    return this.http.get<Day[]>('https://localhost:7040/api/Day/GetDays');
  }

  getDayById(id: string): Observable<Day> {
    return this.http.get<Day>('https://localhost:7040/api/Day/GetDayById/' + id);
  }

  getDaysByWorkoutId(workoutId: string): Observable<Day[]> {
    return this.http.get<Day[]>('https://localhost:7040/api/Day/GetDaysByWorkoutId/' + workoutId)
  }

  createDay(newDay: Day): Observable<Day> {
    console.log(newDay);
    return this.http.post<Day>('https://localhost:7040/api/Day/CreateDay', newDay);
  }

  editDay(updatedDayId: string, updatedDay: Day): Observable<Day> {
    console.log(updatedDay);
    return this.http.put<Day>('https://localhost:7040/api/Day/EditDay/' + updatedDayId, updatedDay);
  }

  deleteDay(deleteDayId: string): Observable<any> {
    return this.http.delete<any>('https://localhost:7040/api/Day/DeleteDay/' + deleteDayId);
  }
}
