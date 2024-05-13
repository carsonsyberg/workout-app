import { Component, ViewChild, Inject, HostBinding, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../classes/workout';
import { interval } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css'],
  animations: [
    // triggers here
  ],
})
export class MyWorkoutsComponent {

  @ViewChild('CREATE_CARD_END')
  createCardRef!: ElementRef;

  @ViewChild('EDIT_CARD')
  editCardRef!: ElementRef;

  @ViewChild('CREATE_CARD_INPUT')
  createInputRef!: ElementRef;

  workouts: Workout[] = [];

  loadingWorkouts: boolean = false;

  creatingWorkout: boolean = false;
  deletingWorkout?: Workout = undefined;
  editingWorkout?: Workout = undefined;

  createWorkoutForm = this.fb.group({
    name: [''],
    description: [''],
    startDate: new FormControl<Date | null>(null),
    repeatSchedule: 0
  });

  editWorkoutForm = this.fb.group({
    name: [''],
    description: ['']
  });

  constructor(private workoutService: WorkoutService, private fb: FormBuilder, http: HttpClient) { }

  ngOnInit() {
    this.getWorkouts();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.workouts, event.previousIndex, event.currentIndex);
    console.log(this.workouts[event.currentIndex]);
  }

  getWorkouts(): void {
    this.loadingWorkouts = true;

    this.workoutService.getWorkouts().subscribe(workouts => {
      this.workouts = workouts;
      this.loadingWorkouts = false;
    });
  }

  favoriteWorkout(workout: Workout) {
    this.workoutService.setFavoriteWorkout(workout).subscribe(result => {
      if (result) {
        const prevFavoriteIndex = this.workouts.findIndex((w: Workout) => w.isFavorite);
        if(prevFavoriteIndex != -1)
          this.workouts[prevFavoriteIndex].isFavorite = false;

        const newFavoriteIndex = this.workouts.findIndex((w: Workout) => w.id === workout.id);
        this.workouts[newFavoriteIndex].isFavorite = true;
      }
      else {
        console.log("Failed to set favorite");
      }
    });
  }

  unfavoriteWorkout(workout: Workout) {

  }

  clickCreatingWorkout() {
    this.creatingWorkout = true;
    interval(2).subscribe(n => { if (n === 2) this.createCardRef.nativeElement.scrollIntoView() });
  }

  cancelCreatingWorkout() {
    this.creatingWorkout = false;
  }

  onCreateWorkout() {
    var workoutToCreate = new Workout();

    workoutToCreate.createdAt = new Date();
    workoutToCreate.description = this.createWorkoutForm.value.description as string;
    workoutToCreate.name = this.createWorkoutForm.value.name as string;
    workoutToCreate.userId = "CARSON";
    workoutToCreate.isFavorite = false;
    workoutToCreate.startDate = this.createWorkoutForm.value.startDate as Date;
    workoutToCreate.repeatSchedule = this.createWorkoutForm.value.repeatSchedule as number;

    this.workoutService.createWorkout(workoutToCreate).subscribe(workout => {
      if (!workout) {
        console.log("Failed to create workout");
        return;
      }
        
      this.createWorkoutForm.reset();
      this.creatingWorkout = false;
      this.workouts.push(workout);
    });
  }

  clickDeletingWorkout(workout: Workout) {
    this.deletingWorkout = workout;
  }

  cancelDeletingWorkout() {
    this.deletingWorkout = undefined;
  }

  onDeleteWorkout() {
    if (this.deletingWorkout && this.deletingWorkout.id) {
      this.workoutService.deleteWorkout(this.deletingWorkout.id).subscribe(() => {
        const index = this.workouts.findIndex((workout: Workout) => workout.id === this.deletingWorkout!.id);
        this.workouts.splice(index, 1);
        this.deletingWorkout = undefined;
      });
    }
  }

  clickEditingWorkout(workout: Workout) {
    this.editingWorkout = workout;
    this.editWorkoutForm.controls['name'].setValue(workout.name as string);
    this.editWorkoutForm.controls['description'].setValue(workout.description as string);
    interval(2).subscribe(n => { if (n === 2) this.editCardRef.nativeElement.scrollIntoView({ block: "center" })});
  }

  cancelEditingWorkout() {
    this.editingWorkout = undefined;
  }

  onEditWorkout() {
    // check if workout has been changed
    if (this.editingWorkout && this.editingWorkout.id) {

      // form data is the same as original workout values
      if (this.editWorkoutForm.value.name == this.editingWorkout.name && this.editWorkoutForm.value.description == this.editingWorkout.description) {
        this.cancelEditingWorkout();
        return;
      }

      this.editingWorkout.name = this.editWorkoutForm.value.name as string;
      this.editingWorkout.description = this.editWorkoutForm.value.description as string;

      this.workoutService.editWorkout(this.editingWorkout.id, this.editingWorkout).subscribe(() => {
        const index = this.workouts.findIndex((workout: Workout) => workout.id === this.editingWorkout!.id);
        this.workouts.splice(index, 1, this.editingWorkout as Workout);
        this.editingWorkout = undefined;
      });
    }
  }
}
