import { Injectable, OnDestroy } from "@angular/core";
import { Category } from '@app/shell/models/category.model';
import { StudentsRepoService } from '../grid/srepo.service';

@Injectable()
export class StudentFormService implements OnDestroy {
    constructor(private studentRepoSrv: StudentsRepoService) {}
  save(category: Category, completeCallback: any) {
    this.studentRepoSrv.save(category).subscribe(el => {
      completeCallback(el);
    });
  }
  get(id: number, completeCallback: any) {
    return this.studentRepoSrv.get(id).subscribe(el => {
      completeCallback(el);
    });
  }
  generateNew(): Category {
    return {
      id: 0,
      isdeleted: false,
      name: '',
      notificationid: 0,
      productcount: 0,
      products: []
    };
  }
    ngOnDestroy(){}
}