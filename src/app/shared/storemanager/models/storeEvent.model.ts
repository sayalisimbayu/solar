import { Store } from './store.model';

export class StoreEvent {
  public key: string;
  public path: string[];
  public store: Store;
  public changedValue: any;
  public oldValue: any;
}
