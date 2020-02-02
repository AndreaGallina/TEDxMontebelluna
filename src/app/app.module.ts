import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {EdizioniComponent} from './edizioni/edizioni.component';
import {TeamComponent} from './team/team.component';
import {SpeakersListComponent} from './speakers/speakers-list/speakers-list.component';
import {PartnersComponent} from './partners/partners.component';
import {GalleryComponent} from './gallery/gallery.component';
import {ContattiComponent} from './contatti/contatti.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VgCoreModule} from 'videogular2/compiled/src/core/core';
import {VgControlsModule} from 'videogular2/compiled/src/controls/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/src/overlay-play/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/src/buffering/buffering';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxCaptchaModule} from 'ngx-captcha';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BsDropdownModule, CollapseModule} from 'ngx-bootstrap';
import {InViewportModule} from 'ng-in-viewport';
import {SpeakerDetailsComponent} from './speakers/speaker-details/speaker-details.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {NgxMasonryModule} from 'ngx-masonry';
import 'hammerjs';
import {LightboxModule} from 'ngx-lightbox';
import {PrivacyComponent} from './privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    EdizioniComponent,
    TeamComponent,
    SpeakersListComponent,
    PartnersComponent,
    GalleryComponent,
    ContattiComponent,
    SpeakerDetailsComponent,
    PrivacyComponent
  ],
  entryComponents: [
    PrivacyComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgxCaptchaModule,
    HttpClientModule,
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    InViewportModule,
    YouTubePlayerModule,
    NgxMasonryModule,
    LightboxModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contatti', component: ContattiComponent },
      { path: 'edizioni', component: EdizioniComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'partners', component: PartnersComponent },
      { path: 'speakers', component: SpeakersListComponent },
      { path: 'speakers/:speakerId', component: SpeakerDetailsComponent },
      { path: 'team', component: TeamComponent },
      { path: '',   redirectTo: 'home', pathMatch: 'full' }
    ], {
      scrollOffset: [0, 64],
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      useHash: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
