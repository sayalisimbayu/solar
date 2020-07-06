import { ICPageConfig, ICGridConfig } from '@app/shared/custom.component/cgrid/config/config';
import { CategoryRepoService } from '@app/shared/reposervice/category.repo.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { Subscription } from 'rxjs';

export class CategoryGridService {
  public pageGridConfig: ICGridConfig;
  throttle = 50;
  scrollDistance = 1;
  scrollUpDistance = 2;
  latestSearch: string = undefined;
  private totalRows: number = 0;
  private subscription: Subscription;

  constructor(private store: SimpleStoreManagerService, private categoryRepSrv: CategoryRepoService) {
    this.pageGridConfig = {
      itemMap: {
        heading: 'name',
        description: '',
        subHeading: 'productcount'
      },
      itemMapDescription: {
        heading: '',
        description: '',
        subHeading: 'Products: '
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
      this.categoryRepSrv
        .getPaged({
          pageNumber: event.currentPage,
          pageSize: event.pagesize,
          search
        })
        .subscribe((el: any) => {
          if (el !== undefined) {
            this.latestSearch = search;
            that.totalRows = el.totalCount;
            that.pageGridConfig.items.push(...el.categories);
            that.store.setIn('categorypagegridconfig', ['items'], that.pageGridConfig.items);
            that.pageGridConfig.page.currentPage++;
            that.store.setIn('categorypagegridconfig', ['page', 'currentPage'], that.pageGridConfig.page.currentPage);
          }
        });
    }
  }
  onScroll(event: ICPageConfig) {
    this.getLatestPage(event, this.latestSearch);
  }
  onDelete(event: any, category: any) {
    console.log(category);
    // alert('deleting');
    return this.categoryRepSrv.delete(category.id).subscribe(el => {
      return el;
    });
  }
  onSelect(event: any, category: any) {
    this.store.add('categorynavigatingid', category.id, true);
    this.navigateToForm();
  }
  navigateToForm() {
    this.store.setIn('categorypageconfig', ['pageHeading'], 'Category Form');
    this.store.setIn('categorypageconfig', ['pageBodyUrl'], 'app-category-form');
  }
}
