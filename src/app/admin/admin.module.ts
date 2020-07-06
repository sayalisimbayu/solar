import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@app/core/layout/layout.module';
import { AdminComponent } from './admin/admin.component';
import { routing } from './admin.routing';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';

@NgModule({
  imports: [CommonModule, routing, NgxEchartsModule, LayoutModule, RichTextEditorAllModule, NgbModule],
  declarations: [AdminComponent],
  providers: [UserRepoService]
})
export class AdminModule {}
