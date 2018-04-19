import { Component, Inject } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
/** report component*/
export class ReportComponent {
    baseUrl = "";
    Url = 'api/Report';
    public reportList: Report[];

    //Create constructor to get Http instance
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + this.Url;
    }

    ngOnInit(): void{
        this.http.get(this.baseUrl).subscribe(result => {
            this.reportList = result.json() as Report[];
            console.log(this.reportList);
        }, error => console.error(error));   
    }
}

export class Report {
    public categoryId: number;
    public name: string;
    public count: number;
    public max: number;
    public min: number;
    public average: number;
}