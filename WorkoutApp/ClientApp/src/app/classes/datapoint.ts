export class DataPoint {
  value: number;
  name: Date;

  constructor(n:number, d:Date) {
    this.name = d;
    this.value = n;
  }
}

export class GraphData {
  name: String;
  series: DataPoint[];

  constructor(n:String, d:DataPoint[]) {
    this.name = n;
    this.series = d;
  }
}
