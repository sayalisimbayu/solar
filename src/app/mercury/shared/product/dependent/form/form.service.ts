import { Product } from '@app/shell/models/product.model';
import { ProductRepoService } from '@app/shared/reposervice/product.repo.service';

export class ProductFormService {
    constructor(private catRepoSrv: ProductRepoService) {
    }
    save(product: Product, completeCallback: any) {
        this.catRepoSrv.save(product).subscribe(el => {
            completeCallback(el);
        });
    }
    get(id: number, completeCallback: any) {
        return this.catRepoSrv.get(id).subscribe(el => {
            completeCallback(el);
        });
    }
    generateNew(): Product {
        return {
            id: 0,
            isdeleted: false,
            name: '',
            subheader: '',
            price: 0,
            notificationid: 0,
            categories: [],
            categorycount: 0
        }
    }
}