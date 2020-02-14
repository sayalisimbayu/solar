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
import { BnNgIdleService } from 'bn-ng-idle';
import { UserRepoService } from './shared/reposervice/user.repo.service';
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
    HttpClientModule
    // AuthenticationModule
  ],
  providers: [
    LazyLoaderService,
    AuthService,
    LoginActivate,
    CryptService,
    BnNgIdleService,
    UserRepoService,
    { provide: LAZY_WIDGETS, useFactory: lazyArrayToObj },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router, private authsrv: AuthService) {}
}
