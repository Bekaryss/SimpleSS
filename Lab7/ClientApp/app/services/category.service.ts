import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Category } from '../components/category/category.component';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoryService {
    //URL for CRUD operations
    baseUrl = "";
    Url = 'api/Categories';
    //Create constructor to get Http instance
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + this.Url;
    }
    //Fetch all articles
    getAllCategories(): Observable<Category[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);

    }
    //Create article
    createCategory(category: Category): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.baseUrl, category, options)
            .map(success => success.status)
            .catch(this.handleError);
    }
    //Fetch article by id
    getCategoryById(categoryId: string): Observable<Category> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.baseUrl + "/" + categoryId);
        return this.http.get(this.baseUrl + "/" + categoryId)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //Update article
    updateCategory(Category: Category): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.baseUrl + "/" + Category.id, Category, options)
            .map(success => success.status)
            .catch(this.handleError);
    }
    //Delete article	
    deleteCategoryById(categoryId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.baseUrl + "/" + categoryId)
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