import { ICPageConfig, ICGridConfig } from '@app/shared/custom.component/cgrid/config/config';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { Subscription } from 'rxjs';
import { ProductRepoService } from '@app/shared/reposervice/product.repo.service';

export class ProductGridService {
  public pageGridConfig: ICGridConfig;
  throttle = 50;
  scrollDistance = 1;
  scrollUpDistance = 2;
  latestSearch: string = undefined;
  private totalRows: number = 0;
  private subscription: Subscription;

  constructor(private store: SimpleStoreManagerService, private productRepSrv: ProductRepoService) {
    this.pageGridConfig = {
      itemMap: {
        heading: 'name',
        description: 'price',
        subHeading: 'subheader'
      },
      itemMapDescription: {
        heading: '',
        description: 'Price: ',
        subHeading: 'Unit: '
      },
      items: [],
      page: {
        pagesize: 30,
        currentPage: 0,
        throttle: 50,
        scrollDistance: 1,
        scrollUpDistance: 2
      },
      isCheckbox: false,
      isDelete: true,
      functions: {
        onDelete: this.onDelete.bind(this),
        onSelect: this.onSelect.bind(this),
        onScroll: this.onScroll.bind(this)
      }
    };
  }
  getLatestPage(event: ICPageConfig, search?: string): void {
    const that = this;
    if (this.totalRows >= this.pageGridConfig.items.length) {
      this.productRepSrv
        .getPaged({
          pageNumber: event.currentPage,
          pageSize: event.pagesize,
          search
        })
        .subscribe((el: any) => {
          if (el !== undefined) {
            this.latestSearch = search;
            that.totalRows = el.totalCount;
            that.pageGridConfig.items.push(...el.products);
            that.store.setIn('productpagegridconfig', ['items'], that.pageGridConfig.items);
            that.pageGridConfig.page.currentPage++;
            that.store.setIn('productpagegridconfig', ['page', 'currentPage'], that.pageGridConfig.page.currentPage);
          }
        });
    }
  }
  onScroll(event: ICPageConfig) {
    this.getLatestPage(event, this.latestSearch);
  }
  onDelete(event: any, product: any) {
    console.log(product);
    // alert('deleting');
    return this.productRepSrv.delete(product.id).subscribe(el => {
      return el;
    });
  }
  onSelect(event: any, product: any) {
    this.store.add('productnavigatingid', product.id, true);
    this.navigateToForm();
  }
  navigateToForm() {
    this.store.setIn('productpageconfig', ['pageHeading'], 'Product Form');
    this.store.setIn('productpageconfig', ['pageBodyUrl'], 'app-product-form');
  }
}
