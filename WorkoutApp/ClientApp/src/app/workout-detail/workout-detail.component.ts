import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ViewportScroller } from "@angular/common";
import { ActivatedRoute, ParamMap } from '@angular/router'
import { FormBuilder } from '@angular/forms';
import { WorkoutService } from '../services/workout.service';
import { DayService } from '../services/day.service';
import { Workout } from '../classes/workout';
import { Day, DayOfWeek } from '../classes/day';
import { interval } from 'rxjs';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.css']
})
export class WorkoutDetailComponent implements OnInit {

  @ViewChild('CREATE_CARD_END')
  createCardRef!: ElementRef;

  days: Day[] = [];

  loadingDays: boolean = false;

  currentWorkout?: Workout = undefined;
  repeatSchedule?: string;
  startDate?: string;

  creatingDay: boolean = false;
  availableDaysOfWeek: DayOfWeek[] = [];

  deletingDay?: Day = undefined;
  editingDay?: Day = undefined;

  createDayForm = this.fb.group({
    name: [''],
    description: [''],
    dayOfWeek: ['']
  });

  editDayForm = this.fb.group({
    name: [''],
    description: ['']
  });

  workoutId: string = '';
  constructor(private route: ActivatedRoute, private workoutService: WorkoutService, private dayService: DayService, private fb: FormBuilder, private scroller: ViewportScroller) {
    scroller.setOffset([0, 0]);

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.workoutId = params.get('id') as string;
      this.getWorkout(this.workoutId);
    });
  }

  setAvailableDaysOfWeek(repeat: number) {
    for (let i = 0; i < repeat; i++) {
      if (repeat === 1) {
        this.availableDaysOfWeek.push(new DayOfWeek("Monday", 1));
        this.availableDaysOfWeek.push(new DayOfWeek("Tuesday", 2));
        this.availableDaysOfWeek.push(new DayOfWeek("Wednesday", 3));
        this.availableDaysOfWeek.push(new DayOfWeek("Thursday", 4));
        this.availableDaysOfWeek.push(new DayOfWeek("Friday", 5));
        this.availableDaysOfWeek.push(new DayOfWeek("Saturday", 6));
        this.availableDaysOfWeek.push(new DayOfWeek("Sunday", 7));
      }
      else {
        this.availableDaysOfWeek.push(new DayOfWeek("Monday (Week " + (i + 1) + ")", this.getDayValue("Monday (Week " + (i + 1) + ")")));
        this.availableDaysOfWeek.push(new DayOfWeek("Tuesday (Week " + (i + 1) + ")", this.getDayValue("Tuesday (Week " + (i + 1) + ")")));
        this.availableDaysOfWeek.push(new DayOfWeek("Wednesday (Week " + (i + 1) + ")", this.getDayValue("Wednesday (Week " + (i + 1) + ")")));
        this.availableDaysOfWeek.push(new DayOfWeek("Thursday (Week " + (i + 1) + ")", this.getDayValue("Thursday (Week " + (i + 1) + ")")));
        this.availableDaysOfWeek.push(new DayOfWeek("Friday (Week " + (i + 1) + ")", this.getDayValue("Friday (Week " + (i + 1) + ")")));
        this.availableDaysOfWeek.push(new DayOfWeek("Saturday (Week " + (i + 1) + ")", this.getDayValue("Saturday (Week " + (i + 1) + ")")));
        this.availableDaysOfWeek.push(new DayOfWeek("Sunday (Week " + (i + 1) + ")", this.getDayValue("Sunday (Week " + (i + 1) + ")")));
      }
    }
  }

  getWorkout(id: string): void {
    this.workoutService.getWorkoutById(id).subscribe(result => {
      this.currentWorkout = result;
      this.startDate = `${result.startDate?.toString().split("-")[1]}/${result.startDate?.toString().split("-")[2].split("T")[0]}/${result.startDate?.toString().split("-")[0]}`;
      switch (result.repeatSchedule) {
        case 0:
          this.repeatSchedule = "Does Not Repeat";
          break;
        case 1 :
          this.repeatSchedule = "Repeats Weekly";
          break;
        default:
          this.repeatSchedule = `Repeats Every ${result.repeatSchedule} Weeks`;
          break;
      }

      this.setAvailableDaysOfWeek(result.repeatSchedule as number);
      this.getDays();
    });
  }

  getDays(): void {
    this.loadingDays = true;
    this.dayService.getDaysByWorkoutId(this.workoutId).subscribe(result => {
      this.days = result;
      this.loadingDays = false;
      for (let i = 0; i < this.days.length; i++) {
        console.log('DayOfWeek ', this.days[i].dayOfWeek);
        this.availableDaysOfWeek = this.availableDaysOfWeek.filter(d => !(d.dayName === this.days[i].dayOfWeek));
        console.log(this.availableDaysOfWeek);
      }
      this.days = this.days.sort((a, b) => this.getDayValue(a.dayOfWeek as string) < this.getDayValue(b.dayOfWeek as string) ? -1 : 1);
    });
  }

  clickCreatingDay() {
    this.creatingDay = true;
    interval(2).subscribe(n => { if (n === 2) this.createCardRef.nativeElement.scrollIntoView() });
  }

  cancelCreatingDay() {
    this.creatingDay = false;
  }

  onCreateDay() {
    var dayToCreate = new Day();

    dayToCreate.name = this.createDayForm.value.name as string;
    dayToCreate.workoutId = this.workoutId;
    dayToCreate.dayOfWeek = this.createDayForm.value.dayOfWeek as string;

    if (!dayToCreate.name || !dayToCreate.dayOfWeek)
      return;

    this.dayService.createDay(dayToCreate).subscribe(day => {
      this.createDayForm.reset();
      this.creatingDay = false;
      this.days.push(day);
      this.availableDaysOfWeek = this.availableDaysOfWeek.filter(d => !(d.dayName === dayToCreate.dayOfWeek));
      this.days = this.days.sort((a, b) => this.getDayValue(a.dayOfWeek as string) < this.getDayValue(b.dayOfWeek as string) ? -1 : 1);
    });
  }

  clickDeletingDay(day: Day) {
    this.deletingDay = day;
  }

  cancelDeletingDay() {
    this.deletingDay = undefined;
  }

  onDeleteDay() {
    if (this.deletingDay && this.deletingDay.id) {
      this.dayService.deleteDay(this.deletingDay.id).subscribe(() => {
        const index = this.days.findIndex((day: Day) => day.id === this.deletingDay!.id);
        this.availableDaysOfWeek.push(new DayOfWeek(this.days[index].dayOfWeek as string, this.getDayValue(this.days[index].dayOfWeek as string)));
        this.availableDaysOfWeek = this.availableDaysOfWeek.sort((a, b) => a.dayValue! < b.dayValue! ? -1 : 1);
        this.days.splice(index, 1);
        this.deletingDay = undefined;
      });
    }
  }

  getDayValue(d: string) {
    console.log("getDayValue of ", d)
    var day = d.split(" ")[0];
    var week = d.split(" ").length > 1 ? d.split(" ")[2].split(")")[0] : "1";
    var value = -1;

    switch (day) {
      case "Monday":
        value = 0;
        break;
      case "Tuesday":
        value = 1;
        break;
      case "Wednesday":
        value = 2;
        break;
      case "Thursday":
        value = 3;
        break;
      case "Friday":
        value = 4;
        break;
      case "Saturday":
        value = 5;
        break;
      case "Sunday":
        value = 6;
        break;
      default:
        value = -1;
        break;
    }

    return value + (parseInt(week)-1)*7;
  }
}
