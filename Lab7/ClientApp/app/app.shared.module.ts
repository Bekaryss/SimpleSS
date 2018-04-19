import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { CategoryComponent } from './components/category/category.component';
import { PeopleComponent } from './components/people/people.component';
import { CategoryService } from './services/category.service';
import { PeopleService } from './services/people.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReportComponent } from './components/report/report.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        CategoryComponent,
        PeopleComponent,
        ReportComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'people', component: PeopleComponent }, 
            { path: 'report', component: ReportComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        CategoryService,
        PeopleService
    ]
})
export class AppModuleShared {
}
