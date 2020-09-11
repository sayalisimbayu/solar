import { Component, ViewEncapsulation } from '@angular/core';
import { TimelineItem } from 'ngx-vertical-timeline';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';

@Component({
  selector: 'app-timelineChart',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimeLineComponent {
  items: TimelineItem[] = [];
  externalVariable = 'hello';
  timeline: any = [];
  constructor(private store: SimpleStoreManagerService) {}
  ngOnInit() {
    const self = this;
    this.timeline = this.store.getByKey('timelineconfig').timeline;

    this.timeline.item1.forEach((timel: any) => {
      this.items.push({
        label: '',
        icon: 'fa fa-calendar-plus-o',
        styleClass: 'teste',
        content: `${timel.message}`,
        title: `${timel.type}`
      });
    });

    // this.items.push({
    //   label: 'Action',
    //   icon: 'fa fa-calendar-plus-o',
    //   styleClass: 'teste',
    //   content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    //   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    //   title: '18 de June, 2019, 10:12',
    //   command() {
    //     alert(`test: ${self.externalVariable}`);
    //   }
    // });

    // this.items.push({
    //   label: 'Action',
    //   icon: 'fa fa-plus',
    //   styleClass: 'teste',
    //   content: `Ut enim ad minim veniam, quis nostrud exercitation ullamco
    //   laboris nisi ut aliquip ex ea commodo consequat.`,
    //   title: '11 de November, 2019, 12:00',
    //   command() {
    //     alert('Action!');
    //   }
    // });

    // this.items.push({
    //   label: 'Action',
    //   icon: 'fa fa-user-circle-o',
    //   styleClass: 'teste',
    //   content: `Duis aute irure dolor in reprehenderit in voluptate velit
    //    esse cillum dolore eu fugiat nulla pariatur.`,
    //   title: '01 de December, 2019, 10:12',
    //   command() {
    //     alert('Action!');
    //   }
    // });

    // this.items.push({
    //   label: 'Action',
    //   icon: 'fa fa-handshake-o',
    //   styleClass: 'teste',
    //   content: `Excepteur sint occaecat cupidatat non proident,
    //   sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    //   title: '27 de January, 2020, 10:35',
    //   command() {
    //     alert('Action!');
    //   }
    // });
  }
}
