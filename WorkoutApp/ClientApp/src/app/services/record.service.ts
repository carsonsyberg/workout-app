import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Record } from '../classes/record';
import {DataPoint} from "../classes/datapoint";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  public records: Record[] = [];
  constructor(private http: HttpClient) {
  }

  getRecords(): Observable<Record[]> {
    return this.http.get<Record[]>('https://localhost:7040/api/Record/GetRecords');
  }

  getExercises(): Observable<String[]> {
    return this.http.get<String[]>('https://localhost:7040/api/Record/GetExercises')
  }

  getRecordById(id: string): Observable<Record> {
    return this.http.get<Record>('https://localhost:7040/api/Record/GetRecordById/' + id);
  }

  getRecordsByDayId(id: string): Observable<Record[]> {
    return this.http.get<Record[]>('https://localhost:7040/api/Record/GetRecordsByDayId/' + id);
  }

  getRecordsByWorkoutId(id: string): Observable<Record[]> {
    return this.http.get<Record[]>('https://localhost:7040/api/Record/GetRecordsByWorkoutId/' + id);
  }

  getRecordsByDateCompleted(date: Date): Observable<Record[]> {
    return this.http.get<Record[]>('https://localhost:7040/api/Record/GetRecordsByDateCompleted/' + date.toJSON());
  }

  getMaxWeightsByExercise(exercise: String): Observable<DataPoint[]> {
    return this.http.get<DataPoint[]>('https://localhost:7040/api/Record/GetMaxWeightsByExercise/' + exercise);
  }

  getTotalWeightsPerDayByExercise(exercise: String): Observable<DataPoint[]> {
    return this.http.get<DataPoint[]>('https://localhost:7040/api/Record/GetTotalWeightsPerDayByExercise/' + exercise);
  }

  createRecord(newRecord: Record): Observable<Record> {
    console.log(newRecord);
    return this.http.post<Record>('https://localhost:7040/api/Record/CreateRecord', newRecord);
  }

  editRecord(updatedRecordId: string, updatedRecord: Record): Observable<Record> {
    console.log(updatedRecord);
    return this.http.put<Record>('https://localhost:7040/api/Record/EditRecord/' + updatedRecordId, updatedRecord);
  }

  deleteRecord(deleteRecordId: string): Observable<any> {
    return this.http.delete<any>('https://localhost:7040/api/Record/DeleteRecord/' + deleteRecordId);
  }

  getTotalWeightMoved(): Observable<number> {
    return this.http.get<number>('https://localhost:7040/api/Record/GetTotalWeightMoved');
  }

  getTotalRepsCompleted(): Observable<number> {
    return this.http.get<number>('https://localhost:7040/api/Record/GetTotalRepsCompleted');
  }
}
