import {Component, OnInit} from '@angular/core';
import {speakers} from '../shared/speakers';
import {editions} from '../shared/editions';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers-list.component.html',
  styleUrls: ['./speakers-list.component.css']
})
export class SpeakersListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getCurrentEditionSpeakers(): any[] {
    return speakers.filter(speaker => speaker.edition === editions.EDITION_2020);
  }

  getPastEditionsSpeakers(): any[] {
    return speakers.filter(speaker => speaker.edition !== editions.EDITION_2020);
  }

  getEditionIconForSpeaker(speaker: any) {
    if (speaker.edition === editions.EDITION_2019) {
      return 'assets/img/LogoEdizione2019.png';
    } else if (speaker.edition === editions.EDITION_2018) {
      return 'assets/img/LogoEdizione2018b.jpg';
    }
  }
}
