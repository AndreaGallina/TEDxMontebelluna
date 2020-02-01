import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeInLeft, fadeInRight} from 'ng-animate';
import {ActivatedRoute} from '@angular/router';
import {speakers} from '../shared/speakers';
import {editions} from '../shared/editions';

@Component({
  selector: 'app-speaker-details',
  templateUrl: './speaker-details.component.html',
  styleUrls: ['./speaker-details.component.css'],
  animations: [
    trigger('fadeInRight', [
      state('hidden', style({opacity: 0})),
      state('visible', style({opacity: 1})),
      transition('hidden => visible',
        useAnimation(fadeInRight, {
            params: {
              timing: 0.5
            }
          }
        )
      )
    ]),
    trigger('fadeInLeft', [
      state('hidden', style({opacity: 0})),
      state('visible', style({opacity: 1})),
      transition('hidden => visible',
        useAnimation(fadeInLeft, {
            params: {
              timing: 0.5
            }
          }
        )
      )
    ])
  ]
})
export class SpeakerDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('suggestedTalks', {static: false}) suggestedTalks: ElementRef;
  speaker;
  featuredSpeakers = [];
  videoWidth: number;
  videoHeight: number;

  elementInViewport = {
    'first-card-img': false
  };

  constructor(private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.speaker = speakers[params.get('speakerId')];
    });
    this.loadYoutubeApi();
    this.getFeaturedSpeakers();
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  private onResize = (): void => {
    // Adatta dimensioni del video di yt alla pagina, fino ad un massimo di 990px in larghezza.
    this.videoWidth = Math.min(this.suggestedTalks.nativeElement.clientWidth, 990);
    this.videoHeight = this.videoWidth * 0.6;
    this.changeDetectorRef.detectChanges();
  }

  private loadYoutubeApi() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (visible) {
      this.elementInViewport[target.id] = true;
    }
  }

  onYoutubePlayerReady() {
    console.log('yt player ready');
  }

  // TODO Implementare randomness
  getFeaturedSpeakers() {
    const speakersMinusCurrentSpeaker = speakers.filter(
      value => value.edition !== editions.EDITION_2020 && value.videoId !== this.speaker.videoId
    );
    const randomSpeakersIndices = this.generateRandomNumbers(3, speakersMinusCurrentSpeaker.length);
    this.featuredSpeakers = [
      speakersMinusCurrentSpeaker[randomSpeakersIndices[0]],
      speakersMinusCurrentSpeaker[randomSpeakersIndices[1]],
      speakersMinusCurrentSpeaker[randomSpeakersIndices[2]]
    ];
  }

  getShortenedTalkDescription(description: string) {
    return description.split(/([ .,;]+)/g, 40).join('');
  }

  getSpeakerId(speaker) {
    return speakers.indexOf(speaker);
  }

  onFeaturedSpeakerClick() {
    this.getFeaturedSpeakers();
  }

  private generateRandomNumbers(numbersRequired: number, maxValue: number) {
    let arr = [];
    while (arr.length < numbersRequired) {
      const r = Math.floor(Math.random() * maxValue);
      if (arr.indexOf(r) === -1) { arr.push(r); }
    }
    return arr;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

}
