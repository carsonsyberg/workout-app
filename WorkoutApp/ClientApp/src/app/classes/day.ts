export class Day {
  id?: string;
  workoutId?: string;
  name?: string;
  order?: number;
  dayOfWeek?: string;
  sets: Array<Set>;

  constructor() {
    this.workoutId = "";
    this.name = "";
    this.order = undefined;
    this.dayOfWeek = "";
    this.sets = [];
  }
}

export class Set {
  name?: string;
  order?: number;
  reps: Array<Rep>;

  constructor() {
    this.name = undefined;
    this.order = undefined;
    this.reps = [];
  }
}

export class Rep {
  numReps?: number;
  weight?: number;

  constructor() {
    this.numReps = undefined;
    this.weight = undefined;
  }
}

export class DayOfWeek {
  dayName?: string;
  dayValue?: number;

  constructor(d: string, v: number) {
    this.dayName = d;
    this.dayValue = v;
  }
}
