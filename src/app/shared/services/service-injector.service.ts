import { Injectable, Injector, Compiler, Inject, NgModuleFactory, Type, ViewContainerRef } from '@angular/core';
import { LAZY_WIDGETS } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class ServiceInjector {
  constructor(
    private injector: Injector,
    private compiler: Compiler,
    @Inject(LAZY_WIDGETS)
    private lazyWidgets: {
      [key: string]: () => Promise<NgModuleFactory<any> | Type<any>>;
    }
  ) {}

  async inject(name: string, callback?: Function) {
    const tempModule = await this.lazyWidgets[name]();

    let moduleFactory;

    if (tempModule instanceof NgModuleFactory) {
      // For AOT
      moduleFactory = tempModule;
    } else {
      // For JIT
      moduleFactory = await this.compiler.compileModuleAsync(tempModule);
    }
    const service = (moduleFactory.moduleType as any).entryservice;
    let serviceClass = {};
    if(service && typeof service === typeof Function) {
        serviceClass = new service();
    }
    if (callback != null) {
      callback(serviceClass);
    }
  }
}
