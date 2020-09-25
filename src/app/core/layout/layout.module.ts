import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NotificationPaneComponent } from './notificationPane/notification-pane.component';
@NgModule({
  imports: [CommonModule, NgbModule, RouterModule],
  declarations: [HeaderComponent, SidebarComponent, PageLoaderComponent, NotificationPaneComponent],
  exports: [HeaderComponent, SidebarComponent, PageLoaderComponent, NotificationPaneComponent]
})
export class LayoutModule {}
