import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
/** category component*/
export class CategoryComponent {
    //Component properties
    public categoryList: Category[];
    statusCode: number;
    requestProcessing = false;
    categoryIdToUpdate = -1;
    processValidation = false;

    //Create form
    categoryForm = new FormGroup({
        name: new FormControl('', Validators.required),
    });

    //Create constructor to get service instance
    constructor(private categoryService: CategoryService) { }


    ngOnInit(): void {
        this.getAllCategories();
    }

    getAllCategories() {
        this.categoryService.getAllCategories().subscribe(data => this.categoryList = data,
            errorCode => this.statusCode = errorCode);
    }


    onCategoryFormSubmit() {
        this.processValidation = true;
        if (this.categoryForm.invalid) {
            return; //Validation failed, exit from method.
        }
        //Form is valid, now perform create or update
        this.preProcessConfigurations();
        let employee = this.categoryForm.value;
        console.log(employee);
        if (this.categoryIdToUpdate == -1) {

            this.categoryService.createCategory(employee)
                .subscribe(successCode => {
                    this.statusCode = successCode;
                    this.getAllCategories();
                    this.backToCreateCategory();
                },
                errorCode => this.statusCode = errorCode
                );
        } else {

            employee.id = this.categoryIdToUpdate;
            this.categoryService.updateCategory(employee)
                .subscribe(successCode => {
                    this.statusCode = successCode;
                    this.getAllCategories();
                    this.backToCreateCategory();
                },
                errorCode => this.statusCode = errorCode);
        }
    }

    loadCategoryToEdit(categoryId: string) {
        this.preProcessConfigurations();
        this.categoryService.getCategoryById(categoryId)
            .subscribe(category => {
                console.log(category)
                this.categoryIdToUpdate = category.id;
                this.categoryForm.setValue(
                    {
                        name: category.name,
                    });
                this.processValidation = true;
                this.requestProcessing = false;
            },
            errorCode => this.statusCode = errorCode);
    }

    deleteCategory(categoryId: string) {
        this.preProcessConfigurations();
        this.categoryService.deleteCategoryById(categoryId)
            .subscribe(successCode => {

                this.statusCode = 204;
                this.getAllCategories();
                this.backToCreateCategory();
            },
            errorCode => this.statusCode = errorCode);
    }


    preProcessConfigurations() {
        this.statusCode = -1;
        this.requestProcessing = true;
    }

    backToCreateCategory() {
        this.categoryIdToUpdate = -1;
        this.categoryForm.reset();
        this.processValidation = false;
    }
}

export class Category {
    public id: number;
    public name: string; 
}