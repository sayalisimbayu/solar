import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxGalleryModule } from 'ngx-gallery';
import { SimpleStoreManagerModule } from './shared/storemanager/storemanager.module';
import { LazyLoaderService } from './shared/services/lazy-loader.service';
import { LAZY_WIDGETS } from './shared/services/tokens';
import { lazyArrayToObj } from './shared/services/lazy-widgets';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shell/auth/authIntercepter';
import { Router } from '@angular/router';
import { AuthService } from './shell/auth/auth.service';
import { LoginActivate } from './shared/other/authGuard';
import { CryptService } from './shared/services/crypt.service';
import { UserRepoService } from './shared/reposervice/user.repo.service';
import { CategoryRepoService } from './shared/reposervice/category.repo.service';
import { NotificationRepoService } from './shared/reposervice/noti.repo.service';
import { ExportService } from './shared/services/export.service';
import { SignalRService } from './shared/services/signalr.service';
import { UserIdleModule } from 'angular-user-idle';
// import { AuthenticationModule } from './authentication/authentication.module';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    routing,
    NgbModule,
    LeafletModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RichTextEditorAllModule,
    LeafletModule.forRoot(),
    NgxGalleryModule,
    SimpleStoreManagerModule,
    HttpClientModule,
    // Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
    // Default values: `idle` is 600 (10 minutes), `timeout` is 300 (5 minutes) 
    // and `ping` is 120 (2 minutes).
    UserIdleModule.forRoot({idle: 5, timeout: 5, ping: 10}),
    // AuthenticationModule
  ],
  providers: [
    LazyLoaderService,
    AuthService,
    LoginActivate,
    CryptService,
    UserRepoService,
    CategoryRepoService,
    NotificationRepoService,
    ExportService,
    SignalRService,
    { provide: LAZY_WIDGETS, useFactory: lazyArrayToObj },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router, private authsrv: AuthService) {}
}
