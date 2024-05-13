export class Record {
  id?: string;
  dayId?: string;
  workoutId?: string;
  setIndex?: number;
  repIndex?: number;
  excerciseName?: string;
  numReps?: number;
  weight?: number;
  dateCompleted?: Date;

  constructor() {
    this.dayId = "";
    this.workoutId = "";
    this.excerciseName = "";
    this.numReps = 0;
    this.weight = 0;
  }
}
