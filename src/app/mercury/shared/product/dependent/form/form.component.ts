import { Component, OnInit } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { Product } from '@app/shell/models/product.model';
import { ProductFormService } from './form.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-page-product-form',
    templateUrl: './form.component.html'
})
export class ProductFormComponent implements OnInit {
    public product = {} as Product;
    private formProductObj: any;
    constructor(private store: SimpleStoreManagerService,
        private productFrmSrv: ProductFormService) {
        this.product.id = this.store.getByKey('productnavigatingid');
        if (this.product.id === 0) {
            this.store.setIn('productpageconfig', ['pageHeading'], 'Create');
        }
        else {
            this.store.setIn('productpageconfig', ['pageHeading'], 'Edit');
        }
        this.store.setIn('productpageconfig', ['showPageAction'], false);

    }
    ngOnInit() {

        if (this.product.id !== 0) {
            this.productFrmSrv.get(this.product.id, (el: Product) => {
                this.product = el;
            });
        }
    }
    onSubmit(form: NgForm) {
        this.formProductObj = form;
        if (form.valid) {
            this.productFrmSrv.save(this.product, (el: any) => {
                if (this.product.id === 0) {
                    if (this.formProductObj != null) {
                        this.formProductObj.resetForm();
                    }
                    this.product = this.productFrmSrv.generateNew();
                }
            });
        }
        return true;
    }
    onCancel($event: any) {
        this.store.setIn('productpageconfig', ['pageBodyUrl'], 'app-product-grid');
    }
}
