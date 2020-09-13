import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageUploaderComponent } from './image-uploader.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { UserListComponent } from './user-list/user-list.component';
import { SafePipe } from './safe.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TimeLineComponent } from './timeline/timeline.component';
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, ReactiveFormsModule, FormsModule, InfiniteScrollModule],
  declarations: [ProfileComponent, ImageUploaderComponent, RightPanelComponent, SafePipe, UserListComponent, TimeLineComponent],
  entryComponents: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {
  static entry = ProfileComponent;
}
