import { Component, ElementRef, ViewChild } from '@angular/core';
import { Day, Set, Rep } from '../classes/day';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { DayService } from '../services/day.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})

// TOOD: upon creating any cards -> scroll to location of created card
// TODO: add confirm modal for successful saves
// TODO: add local storage so you can refresh and still have data before saving
// TODO: make way to check if dayForm is changed then show floating save button once change detected
// TODO: add way to go down table by clicking enter
// TODO: add way to focus on form fields upon creation
export class DayDetailComponent {

  @ViewChild('CREATE_CARD_BTN')
  createCardRef!: ElementRef;

  currentDay?: Day = undefined;

  loadingSets: boolean = false;

  dayId: string = '';

  dayForm: FormGroup;
  dayFormChanged: boolean = false;

  deletingSetIndex: number = -1
  deletingRepIndex: number = -1;
  deletingRepSetIndex: number = -1;

  saveSuccess: boolean = false;

  cameFromHome: boolean = true;

  constructor(private route: ActivatedRoute, private dayService: DayService, private fb: FormBuilder,) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.dayId = params.get('id') as string;
      this.getDay(this.dayId);
    });

    this.dayForm = this.fb.group({
      name: '',
      sets: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.gotoTop();
    var localStorageCurrentDate = localStorage.getItem('currentDate');
    if (localStorageCurrentDate) {
      this.cameFromHome = true;
    }
    else {
      this.cameFromHome = false;
    }
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

  clickAddSet() {
    this.sets().push(this.setForm(''));
    interval(2).subscribe(n => { if (n === 2) this.createCardRef.nativeElement.scrollIntoView() });
  }

  clickDeleteSet(setIndex: number) {
    this.deletingSetIndex = setIndex;
  }

  confirmDeleteSet() {
    this.sets().removeAt(this.deletingSetIndex);
  }

  cancelDeleteSet() {
    this.deletingSetIndex = -1;
  }

  setReps(setIndex: number): FormArray {
    return this.sets().at(setIndex).get('reps') as FormArray;
  }

  repForm(numReps: number | null, weight: number | null): FormGroup {
    return this.fb.group({
      numReps: numReps,
      weight: weight
    });
  }

  clickAddRep(setIndex: number) {
    this.setReps(setIndex).push(this.repForm(null, null));
    if (setIndex === this.sets().length - 1) interval(2).subscribe(n => { if (n === 2) this.createCardRef.nativeElement.scrollIntoView() });
  }

  clickDeleteRep(setIndex: number, repIndex: number) {
    this.deletingRepSetIndex = setIndex;
    this.deletingRepIndex = repIndex;
  }

  confirmDeleteRep() {
    this.setReps(this.deletingRepSetIndex).removeAt(this.deletingRepIndex);
    this.deletingRepSetIndex = -1;
    this.deletingRepIndex = -1;
  }

  cancelDeleteRep() {
    this.deletingRepSetIndex = -1;
    this.deletingRepIndex = -1;
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

  getDay(id: string): void {
    this.loadingSets = true;
    this.dayService.getDayById(id).subscribe(result => {
      this.currentDay = result;

      // TODO: test below: put all values from this.currentDay into the dayForm
      this.dayForm.controls['name'].setValue(this.currentDay.name);
      // loop through sets
      for (let i = 0; i < this.currentDay.sets.length; i++) {
        this.sets().push(this.setForm(this.currentDay.sets[i].name as string));
        // loop through reps
        for (let j = 0; j < this.currentDay.sets[i].reps.length; j++) {
          this.setReps(i).push(this.repForm(this.currentDay.sets[i].reps[j].numReps as number | null, this.currentDay.sets[i].reps[j].weight as number | null));
        }
      }

      this.loadingSets = false;

      this.dayForm.valueChanges.subscribe(data => this.dayFormChanged = true);
    });
  }

  saveDayChanges(): void {
    // TODO: update system to allow decimal values for weight
    this.dayService.editDay(this.dayId, { id: this.dayId, workoutId: this.currentDay!.workoutId, dayOfWeek: this.currentDay!.dayOfWeek, ...this.dayForm.value } as Day).subscribe(() => {
      this.saveSuccess = true;
      interval(35).subscribe((n) => { if (n === 35) this.saveSuccess = false });
    });
  }
}
