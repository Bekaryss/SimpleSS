import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { People } from '../components/people/people.component';

@Injectable()
export class PeopleService {
    //URL for CRUD operations
    baseUrl = "";
    Url = 'api/People';
    //Create constructor to get Http instance
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + this.Url;
    }

    getAllPeoples(): Observable<People[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //Create people item
    createPeople(people: People): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.baseUrl, people, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    //Fetch article by id
    getPeopleById(peopleId: string): Observable<People> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.baseUrl + "/" + peopleId);
        return this.http.get(this.baseUrl + "/" + peopleId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Update people item
    updatePeople(people: People): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.baseUrl + "/" + people.id, people, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    //Delete article	
    deletePeopleById(peopleId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.baseUrl + "/" + peopleId)
            .map(success => success.status)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}