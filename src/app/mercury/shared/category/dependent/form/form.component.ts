import { Component } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';

@Component({
  selector: 'app-page-category-form',
  templateUrl: './form.component.html'
})
export class CategoryFormComponent {
  public dropdownList: Array<any>;
  public selectedItems: Array<any>;
  public dropdownSettings: any;
  public data: any = {};
  constructor(private store: SimpleStoreManagerService) {
    this.dropdownList = [
      { item_id: 1, item_text: 'Cheese' },
      { item_id: 2, item_text: 'Tomatoes' },
      { item_id: 3, item_text: 'Mozzarella' },
      { item_id: 4, item_text: 'Mushrooms' },
      { item_id: 5, item_text: 'Pepperoni' },
      { item_id: 6, item_text: 'Onions' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Mozzarella' },
      { item_id: 4, item_text: 'Mushrooms' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }
  onSubmit(isValid: boolean) {
    if (isValid) {
      // Logic to add/update data here.
    }
  }
  onCancel($event: any) {
    this.store.setIn('categorypageconfig', ['pageHeading'], 'Category Grid');
    this.store.setIn('categorypageconfig', ['pageBodyUrl'], 'app-category-grid');
  }
}
