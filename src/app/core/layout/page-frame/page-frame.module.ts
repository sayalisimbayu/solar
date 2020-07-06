import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageFrameComponent } from './page-frame.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageFrameComponent],
  imports: [CommonModule, NgbModule, RouterModule, TagInputModule, FormsModule, ReactiveFormsModule],
  exports: [],
  entryComponents: [PageFrameComponent]
})
export class PageFrameModule {
  static entry = PageFrameComponent;
}
