import { Category } from '@app/shell/models/category.model';
import { CategoryRepoService } from '@app/shared/reposervice/category.repo.service';

export class CategoryFormService {
  constructor(private catRepoSrv: CategoryRepoService) {}
  save(category: Category, completeCallback: any) {
    this.catRepoSrv.save(category).subscribe(el => {
      completeCallback(el);
    });
  }
  get(id: number, completeCallback: any) {
    return this.catRepoSrv.get(id).subscribe(el => {
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
}
