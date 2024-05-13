export interface Day {
  id?: string;
  workoutId: string;
  name: string;
  order: number;
  sets: Array<Set>;
}

export interface Set {
  name: string;
  order: number;
  reps: Array<Rep>;
}

export interface Rep {
  numReps: number;
  weight: number;
}
