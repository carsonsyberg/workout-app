import { Component } from '@angular/core';
import { Record } from '../classes/record';
import {RecordService} from "../services/record.service";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DataPoint, GraphData} from "../classes/datapoint";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  records: Record[] = [];
  dataPoints: DataPoint[] = [];
  graphData: GraphData[] = [];

  loadingRecords: boolean = false;

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Max Weight';
  yScaleMin: number = 0;
  timeline: boolean = false;

  totalWeightMoved = 0;
  totalRepsCompleted = 0;

  showMaxGraph: boolean = true;

  maxTitle = "Max per Day";
  totalTitle = "Total per Day";

  filterStatsForm = this.fb.group({
    exerciseName: [-1],
    maxOrTotal: ['max'],
    allTimeOrRange: ['all'],
    dateRangeStart: <Date[]>[],
    dateRangeEnd: <Date[]>[]
  });

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  exercises: String[] = [];
  constructor(private recordService: RecordService, private fb: FormBuilder, http: HttpClient) {
    //Object.assign(this, this.graphData);
    recordService.getTotalWeightMoved().subscribe(res => this.totalWeightMoved = res);
    recordService.getTotalRepsCompleted().subscribe(res => this.totalRepsCompleted = res);
    recordService.getExercises().subscribe(res => res.forEach(val => {
      this.exercises.push(val);
      if (res.length > 0)
        this.filterStatsForm.controls.exerciseName.setValue(0);
        this.getDataPoints(res[0]);
    }));

    this.filterStatsForm.controls.exerciseName.valueChanges.subscribe(val => this.search_clicked())
    this.filterStatsForm.controls.allTimeOrRange.valueChanges.subscribe(val => { if (val == "all") this.search_clicked() })
    this.filterStatsForm.controls.dateRangeEnd.valueChanges.subscribe(val => this.search_clicked())
    this.filterStatsForm.controls.maxOrTotal.valueChanges.subscribe(val => this.search_clicked())
    //this.filterStatsForm.controls.dateRangeStart.valueChanges.subscribe(val => this.search_clicked())
    this.filterStatsForm.controls.dateRangeEnd.valueChanges.subscribe(val => this.search_clicked())
  }

  dateTickFormatting(val: any): Date {

    return val.toString().split("T")[0];
  }

  search_clicked() {
    this.getDataPoints(this.exercises[this.filterStatsForm.controls.exerciseName.value ?? 0]);
  }

  ngOnInit() {
    this.getRecords();
  }

  getDataPoints(exercise: String): void {

    this.loadingRecords = true;
    this.graphData = [];
    if (this.filterStatsForm.controls.maxOrTotal.value == "max") {
        this.yAxisLabel = "Max Weight";
        this.recordService.getMaxWeightsByExercise(exercise).subscribe(data => {
        var minYVal = 0;
        var dataCopy = [];

        for(let i = 0; i < data.length; i++) {
          if (i==0) {
            minYVal = data[i].value;
          }
          else {
            if (data[i].value < minYVal)
              minYVal = data[i].value;
          }
          if (this.filterStatsForm.controls.allTimeOrRange.value == "all")
            dataCopy.push(data[i]);
          else if (new Date(data[i].name) <= this.filterStatsForm.controls.dateRangeEnd.value!
                  && new Date(data[i].name) >= this.filterStatsForm.controls.dateRangeStart.value!){
            console.log(new Date(data[i].name))
            dataCopy.push(data[i]);
            //console.log(this.filterStatsForm.controls.dateRangeStart.value)
          }
        }
        var gData = new GraphData(exercise, JSON.parse(JSON.stringify(data)));
        this.graphData.push(new GraphData(exercise, dataCopy));
        this.yScaleMin = minYVal-5;
        //this.graphData.push(new GraphData("Bench Press", JSON.parse(JSON.stringify(data))));

        //Object.assign(this, { gData });
        this.loadingRecords = false;
      })
    }
    else {
      this.yAxisLabel = "Total Weight";
      this.recordService.getTotalWeightsPerDayByExercise(exercise).subscribe(data => {
        var minYVal = 0;
        var dataCopy = [];

        for(let i = 0; i < data.length; i++) {
          if (i==0) {
            minYVal = data[i].value;
          }
          else {
            if (data[i].value < minYVal)
              minYVal = data[i].value;
          }
          if (this.filterStatsForm.controls.allTimeOrRange.value == "all")
            dataCopy.push(data[i]);
          else if (new Date(data[i].name) <= this.filterStatsForm.controls.dateRangeEnd.value!
            && new Date(data[i].name) >= this.filterStatsForm.controls.dateRangeStart.value!){
            console.log(new Date(data[i].name))
            dataCopy.push(data[i]);
            //console.log(this.filterStatsForm.controls.dateRangeStart.value)
          }
        }
        var gData = new GraphData(exercise, JSON.parse(JSON.stringify(data)));
        this.graphData.push(new GraphData(exercise, dataCopy));
        this.yScaleMin = minYVal-0.25*minYVal;
        //this.graphData.push(new GraphData("Bench Press", JSON.parse(JSON.stringify(data))));

        //Object.assign(this, { gData });
        this.loadingRecords = false;
      })
    }
  }

  getRecords(): void {
    //this.loadingRecords = true;

    this.recordService.getRecords().subscribe(records => {
      this.records = records;
      //this.loadingRecords = false;
    });
  }
}
