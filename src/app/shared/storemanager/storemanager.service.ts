import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StoreEvent } from './models/storeEvent.model';
import { Store } from './models/store.model';

@Injectable({ providedIn: 'root' })
export class SimpleStoreManagerService {
  private stores: Store[] = [];
  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addTodo, removeTodo, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _stores = new BehaviorSubject<StoreEvent>({
    key: '',
    store: null,
    path: [],
    oldValue: null,
    changedValue: null
  });

  // Expose the observable$ part of the _todos subject (read only stream)
  readonly $store = this._stores.asObservable();
  public add(key: string, value: any, override: boolean = false) {
    if (!this.stores.some(storeValue => storeValue.key === key)) {
      this.stores.push({ key: key, value: value });
    }
    this._stores.next({
      key: key,
      store: this.stores[this.stores.length - 1],
      path: [],
      oldValue: undefined,
      changedValue: value
    });
  }
  public remove(key: string) {
    if (this.stores.some(storeValue => storeValue.key === key)) {
      const keyIndex = this.stores.findIndex(el => el.key === key);
      this.stores.splice(keyIndex, 1);
    }
  }
  public getByKey(key: string) {
    if (this.stores.some(storeValue => storeValue.key === key)) {
      return this.stores.filter(el => el.key === key)[0].value;
    }
  }
  public has(key: string) {
    if (this.stores.some(storeValue => storeValue.key === key)) {
      return true;
    }
    return false;
  }
  public set(key: string, value: any) {
    if (this.stores.some(storeValue => storeValue.key === key)) {
      const keyIndex = this.stores.findIndex(el => el.key === key);
      const oldValue = this.stores[keyIndex].value;
      this.stores[keyIndex].value = value;
      this._stores.next({ key: key, store: this.stores[keyIndex], path: [], oldValue: oldValue, changedValue: value });
    }
  }
  public setIn(key: string, path: string[], value: any) {
    if (this.stores.some(storeValue => storeValue.key === key)) {
      const keyIndex = this.stores.findIndex(el => el.key === key);
      const oldValue = this.setInvalue(this.stores[keyIndex].value, path, value);
      this._stores.next({
        key: key,
        store: this.stores[keyIndex],
        path: path,
        oldValue: oldValue,
        changedValue: value
      });
    }
  }
  public setInvalue(obj: any, keys: any[], value: any): any {
    const ObjKeys = Object.keys(obj);
    for (let index = 0; index < ObjKeys.length; index++) {
      if (ObjKeys[index] === keys[0]) {
        if (keys.length > 1) {
          const childKeys = keys.slice(1);
          return this.setInvalue(obj[ObjKeys[index]], childKeys, value);
        } else {
          const oldValue = obj[ObjKeys[index]];
          obj[ObjKeys[index]] = value;
          return oldValue;
        }
      }
    }
  }
}
