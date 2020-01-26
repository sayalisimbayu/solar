import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageFrameComponent } from './page-frame.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PageFrameComponent],
  imports: [CommonModule, NgbModule, RouterModule],
  exports: [],
  entryComponents: [PageFrameComponent]
})
export class PageFrameModule {
  static entry = PageFrameComponent;
}
