export interface NewDay {
  workoutId: string;
  name: string;
  order: number;
  sets: Array<Set>;
}

interface Set {
  name: string;
  order: number;
  reps: Array<Rep>;
}

interface Rep {
  numReps: number;
  weight: number;
}
