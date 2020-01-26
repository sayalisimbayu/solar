import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PageTitleComponent],
  imports: [CommonModule, RouterModule],
  exports: [PageTitleComponent],
  entryComponents: [PageTitleComponent]
})
export class PageTitleModule {
  static entry = PageTitleComponent;
}
