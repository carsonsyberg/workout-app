export class Workout {
  id?: string;
  userId?: string;
  name?: string;
  description?: string;
  createdAt?: Date;
  startDate?: Date;
  isFavorite: boolean;
  repeatSchedule?: number;

  constructor() {
    this.userId = "";
    this.name = "";
    this.description = "";
    this.isFavorite = false;
  }
}
