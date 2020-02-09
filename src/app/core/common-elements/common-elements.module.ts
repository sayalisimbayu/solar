import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { CollepsibleComponent } from './collepsible/collepsible.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ProgressbarDefaultComponent } from './progressbar-default/progressbar-default.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivityPostComponent } from './activity-post/activity-post.component';
import { SystemWidgetComponent } from './system-widget/system-widget.component';
import { AppliancesWidgetComponent } from './appliances-widget/appliances-widget.component';
import { ApplianceStatusWidgetComponent } from './appliance-status-widget/appliance-status-widget.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [ProgressbarDefaultComponent, ActivityPostComponent, AlertMessageComponent, CollepsibleComponent, AccordionComponent, SystemWidgetComponent, AppliancesWidgetComponent, ApplianceStatusWidgetComponent],
    exports: [ProgressbarDefaultComponent, ActivityPostComponent, AlertMessageComponent, CollepsibleComponent, AccordionComponent, SystemWidgetComponent, AppliancesWidgetComponent, ApplianceStatusWidgetComponent]
})
export class CommonElementsModule { }
