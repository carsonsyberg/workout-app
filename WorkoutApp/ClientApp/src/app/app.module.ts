import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MyWorkoutsComponent } from './my-workouts/my-workouts.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { DayDetailComponent } from './day-detail/day-detail.component';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LineChartModule } from "@swimlane/ngx-charts";
import * as d3 from 'd3';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MyWorkoutsComponent,
    StatisticsComponent,
    SettingsComponent,
    WorkoutDetailComponent,
    DayDetailComponent,
    LoginComponent,
    RegisterComponent,
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        RouterModule.forRoot([
            {path: '', component: HomeComponent, pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'myworkouts', component: MyWorkoutsComponent},
            {path: 'statistics', component: StatisticsComponent},
            {path: 'settings', component: SettingsComponent},
            {path: 'workout/:id', component: WorkoutDetailComponent},
            {path: 'day/:id', component: DayDetailComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'}),
        BrowserAnimationsModule,
        AngularMaterialModule,
        MatNativeDateModule,
        LineChartModule,
    ],
  providers: [
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
