import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from '@env/environment';
import { SimpleStoreManagerService } from '../storemanager/storemanager.service';
import { INotification } from '@app/shell/models/noti.model';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    options = {
        transport: signalR.HttpTransportType.ServerSentEvents,
        logging: signalR.LogLevel.Trace,
    };

    private hubConnection: signalR.HubConnection
    constructor(private store: SimpleStoreManagerService) {
    }
    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl(environment.serverUrl + '/notify')
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err))
    }
    public SubscribeSendNotification = () => {
        const that = this;
        this.hubConnection.on('SendNotification', (data) => {
            console.log(data);
            that.setNewNotification(data);
        });
    }
    public setNewNotification(noti: INotification) {
        let notifictions: INotification[] = this.store.getByKey('appNotifications');
        if (notifictions === undefined) {
            notifictions = [];
        }
        if (notifictions.some(x => x.id === noti.id)) {
            const notificationIndex = notifictions.findIndex(el => el.id === noti.id);
            notifictions[notificationIndex] = noti;
        }
        else {
            notifictions.push(noti);
        }
        console.log(notifictions);
        this.store.add('appNotifications', notifictions, true);
    }
    public stopConnection = () => {
        this.hubConnection.stop();
    }
}