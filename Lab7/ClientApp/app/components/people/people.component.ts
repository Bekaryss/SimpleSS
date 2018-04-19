import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../category/category.component';
import { PeopleService } from '../../services/people.service';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.css']
})
/** people component*/
export class PeopleComponent {
    public peopleList: People[];
    public categoryList: Category[];

    statusCode: number;
    requestProcessing = false;
    peopleIdToUpdate = -1;
    processValidation = false;

    peopleForm = new FormGroup({
        categoryId: new FormControl('', Validators.required),
        fullName: new FormControl('', Validators.required),
        rating: new FormControl('', Validators.required),
    });

    constructor(private peopleService: PeopleService, private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.getAllCategories();
        this.getAllPeoples();
    }

    getAllPeoples() {
        this.peopleService.getAllPeoples().subscribe(data => this.peopleList = data,
            errorCode => this.statusCode = errorCode);
    }

    getAllCategories() {
        this.categoryService.getAllCategories().subscribe(data => this.categoryList = data,
            errorCode => this.statusCode = errorCode);
    }

    onPeopleFormSubmit() {
        this.processValidation = true;
        if (this.peopleForm.invalid) {
            return
        }
        this.preProcessConfigurations();
        var people = this.peopleForm.value;
        console.log(people);
        if (this.peopleIdToUpdate == -1) {
            this.peopleService.createPeople(people).subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllPeoples();
                this.backToCreatePeople();
            },
                errorCode => this.statusCode = errorCode);
        }
        else {
            people.id = this.peopleIdToUpdate;
            this.peopleService.updatePeople(people).subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllPeoples();
                this.backToCreatePeople();
            }, errorCode => this.statusCode = errorCode);
        }
    }

    //Load article by id to edit
    loadPeopleToEdit(peopleId: string) {
        this.preProcessConfigurations();
        this.peopleService.getPeopleById(peopleId)
            .subscribe(people => {
                console.log(people)
                this.peopleIdToUpdate = people.id;
                this.peopleForm.setValue(
                    {
                        categoryId: people.category.id,
                        fullName: people.fullName,
                        rating: people.rating
                    });
                this.processValidation = true;
                this.requestProcessing = false;
            },
            errorCode => this.statusCode = errorCode);
    }

    //Delete article
    deletePeople(peopleId: string) {
        this.preProcessConfigurations();
        this.peopleService.deletePeopleById(peopleId)
            .subscribe(successCode => {
                //this.statusCode = successCode;
                //Expecting success code 204 from server
                this.statusCode = 204;
                this.getAllPeoples();
                this.backToCreatePeople();
            },
            errorCode => this.statusCode = errorCode);
    }

    preProcessConfigurations() {
        this.statusCode = -1;
        this.requestProcessing = true;
    }

    backToCreatePeople() {
        this.peopleIdToUpdate = -1;
        this.peopleForm.reset();
        this.processValidation = false;
    }
}

export class People {
    public id: number;
    public categoryId: number;
    public category: Category;
    public fullName: string;
    public rating: number
}