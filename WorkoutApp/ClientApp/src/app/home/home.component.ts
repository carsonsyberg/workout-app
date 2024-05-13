import { Component, ElementRef, ViewChild } from '@angular/core';
import { Day, Set, Rep } from '../classes/day';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { DayService } from '../services/day.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../classes/workout';
import { RecordService } from '../services/record.service';
import { Record } from '../classes/record';

@Component({
  selector: 'app-day-detail',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// TOOD: upon creating any cards -> scroll to location of created card
// TODO: add confirm modal for successful saves
// TODO: add local storage so you can refresh and still have data before saving
// TODO: make way to check if dayForm is changed then show floating save button once change detected
// TODO: add way to go down table by clicking enter
// TODO: add way to focus on form fields upon creation
export class HomeComponent {

  @ViewChild('CREATE_CARD_BTN')
  createCardRef!: ElementRef;

  favoriteWorkout?: Workout = undefined;
  loadingFavorite: boolean = true;
  currentDay?: Day = undefined;
  currentDate?: Date;

  days: Day[] = [];
  records: Record[] = [];

  loadingSets: boolean = false;

  dayId: string = '';

  dayForm: FormGroup;
  dayFormChanged: boolean = false;

  deletingSetIndex: number = -1
  deletingRepIndex: number = -1;
  deletingRepSetIndex: number = -1;

  saveSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private workoutService: WorkoutService, private dayService: DayService, private fb: FormBuilder, private recordService: RecordService) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.dayId = params.get('id') as string;
      //this.getDay(this.dayId);
    });

    this.dayForm = this.fb.group({
      name: '',
      sets: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.gotoTop();
    var localStorageCurrentDate = localStorage.getItem('currentDate');
    if (!localStorageCurrentDate) {
      this.currentDate = new Date();
      this.currentDate.setHours(0, 0, 0, 0);
    }
    else {
      this.currentDate = new Date(localStorageCurrentDate);
      console.log("Current Date set from local: ", this.currentDate)
    }
    this.getFavoriteWorkout();
  }

  getFavoriteWorkout() {
    this.workoutService.getFavoriteWorkout().subscribe((w) => {
      if (w) {
        this.favoriteWorkout = w;
        this.getDays();
      }
      this.loadingFavorite = false;
    });
  }

  getDays() {
    if (this.favoriteWorkout) {
      this.dayService.getDaysByWorkoutId(this.favoriteWorkout.id as string).subscribe((days) => {
        this.days = days;
        this.getCurrentDay();
      })
    }
  }

  getCurrentDay() {
    if (this.favoriteWorkout != undefined) {
      var localStorageCurrentDate = localStorage.getItem('currentDate');
      var today;
      if (localStorageCurrentDate) {
        today = new Date(localStorageCurrentDate as string);
        localStorage.removeItem('currentDate');
      }
      else {
        today = new Date(this.currentDate as Date);
      }
      // need to get the current date and match it up based on start date and repeat schedule
      var startDate = new Date(this.favoriteWorkout.startDate as Date);
      // Example -> weekly workout starts Dec 4, it is Monday
      // start at startDate -> loop through days of week until we find current date
      if (today < startDate) {
        console.log("It is before the start date -> no day to display");
        //return undefined;
      }

      let weekCounter = 1;
      var lastDayOfWeek = startDate.getDay() === 0 ? 6 : startDate.getDay() - 1;
      for (var date = startDate; date < today; date.setDate(date.getDate() + 1)) {
        //console.log(date);
        // Get to Day of Week before the one workout starts on -> increase week counter
        if (date.getDay() === lastDayOfWeek) {
          weekCounter++;
        }
      }

      //console.log(weekCounter + " Total weeks of workout");
      //console.log("Repeat every " + this.favoriteWorkout.repeatSchedule + " week(s)");
      var currDayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' })
      var weekOfWorkout = weekCounter % this.favoriteWorkout.repeatSchedule! === 0 ? this.favoriteWorkout.repeatSchedule! : weekCounter % this.favoriteWorkout.repeatSchedule!;
      //console.log("Week " + weekOfWorkout + " of workout")
      if (this.favoriteWorkout.repeatSchedule! > 1)
        currDayOfWeek = currDayOfWeek + " (Week " + weekOfWorkout + ")";

      this.currentDay = this.days.find((d) => d.dayOfWeek === currDayOfWeek);

      this.getSets();
    }
  }

  toPreviousDay() {
    var currDayIndex = this.days.findIndex((d) => d.id === this.currentDay?.id);
    var prevDayIndex = currDayIndex === 0 ? this.days.length - 1 : currDayIndex - 1;
    this.currentDate?.setDate(this.currentDate.getDate() - 1);
    this.getCurrentDay();
  }

  toNextDay() {
    var currDayIndex = this.days.findIndex((d) => d.id === this.currentDay?.id);
    var prevDayIndex = currDayIndex === this.days.length - 1 ? 0 : currDayIndex + 1;
    this.currentDate?.setDate(this.currentDate.getDate() + 1);
    this.getCurrentDay();
  }

  gotoTop() {
    window.scrollTo(0, 0);
  }

  sets(): FormArray {
    return this.dayForm.get('sets') as FormArray;
  }

  setForm(name: string): FormGroup {
    return this.fb.group({
      name: name,
      reps: this.fb.array([])
    });
  }

  setReps(setIndex: number): FormArray {
    return this.sets().at(setIndex).get('reps') as FormArray;
  }

  repForm(numReps: number | null, weight: number | null, recordSaved: boolean): FormGroup {
    return this.fb.group({
      numReps: numReps,
      weight: weight,
      recordSaved: recordSaved
    });
  }

  clickChangeNumReps(upOrDown: boolean, setIndex: number, repIndex: number) {
    const changeRepForm = (<FormGroup>this.setReps(setIndex).at(repIndex));
    let newNumReps = changeRepForm.controls['numReps'].value + (upOrDown ? 1 : -1);
    changeRepForm.controls['numReps'].patchValue(newNumReps);
  }

  clickChangeWeight(upOrDown: boolean, setIndex: number, repIndex: number) {
    const changeRepForm = (<FormGroup>this.setReps(setIndex).at(repIndex));
    let newNumReps = changeRepForm.controls['weight'].value + (upOrDown ? 5 : -5);
    changeRepForm.controls['weight'].patchValue(newNumReps);
  }

  getSets() {
    if (!this.currentDay) {
      return;
    }

    // resets sets array
    while (this.sets().length != 0) {
      this.sets().removeAt(0);
    }

    this.recordService.getRecordsByDateCompleted(this.currentDate as Date).subscribe((records: Record[]) => {
      if (records) {
        this.records = records;

        // loop through sets
        for (let i = 0; i < this.currentDay!.sets.length; i++) {
          this.sets().push(this.setForm(this.currentDay!.sets[i].name as string));
          // loop through reps
          for (let j = 0; j < this.currentDay!.sets[i].reps.length; j++) {
            let recordSaved = this.records.some((record) => record.setIndex == i && record.repIndex == j);
            this.setReps(i).push(this.repForm(this.currentDay!.sets[i].reps[j].numReps as number | null, this.currentDay!.sets[i].reps[j].weight as number | null, recordSaved));
          }
        }

        this.loadingSets = false;

        this.dayForm.valueChanges.subscribe(data => this.dayFormChanged = true);
      }
    });
  }

  saveCompletedReps(setIndex: number, repIndex: number) {
    var setForm = this.sets().at(setIndex) as FormGroup;
    var repForm = this.setReps(setIndex).at(repIndex) as FormGroup;

    var newRecord = new Record();
    newRecord.dayId = this.currentDay!.id;
    newRecord.workoutId = this.currentDay!.workoutId;
    newRecord.setIndex = setIndex;
    newRecord.repIndex = repIndex;
    newRecord.excerciseName = this.sets().at(setIndex).value.name;
    newRecord.numReps = this.setReps(setIndex).at(repIndex).value.numReps;
    newRecord.weight = this.setReps(setIndex).at(repIndex).value.weight;
    newRecord.dateCompleted = this.currentDate;

    this.recordService.createRecord(newRecord).subscribe((record) => {
      if (record) {
        repForm.controls.recordSaved.setValue(true);

        // save the day
        this.saveDayChanges();
      }
    });
  }

  getDay(id: string): void {
    this.loadingSets = true;
    this.dayService.getDayById(id).subscribe(result => {
      this.currentDay = result;

      // TODO: test below: put all values from this.currentDay into the dayForm
      this.dayForm.controls['name'].setValue(this.currentDay.name);

      while (this.sets().length != 0) {
        this.sets().removeAt(0);
      }

      this.getSets();
    });
  }

  onEditDay() {
    localStorage.setItem('currentDate', this.currentDate?.toJSON() as string);
  }

  saveDayChanges(): void {
    // TODO: update system to allow decimal values for weight
    this.dayForm.controls.name.setValue(this.currentDay!.name);
    this.dayService.editDay(this.currentDay!.id as string, { id: this.currentDay!.id, workoutId: this.currentDay!.workoutId, dayOfWeek: this.currentDay!.dayOfWeek, ...this.dayForm.value } as Day).subscribe(() => {
      this.saveSuccess = true;
      interval(35).subscribe((n) => { if (n === 35) this.saveSuccess = false });
    });
  }
}
