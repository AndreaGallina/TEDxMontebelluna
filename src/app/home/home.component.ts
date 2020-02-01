import { Component, OnInit } from '@angular/core';
import {fadeInLeft, fadeInRight} from 'ng-animate';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {

  // Oggetto contenente lo stato delle card.
  // La chiave rappresenta l'id dell'elemento HTML mentre il valore
  // indica se l'elemento è contenuto nella viewport (i.e. ciò che l'utente
  // sta vedendo attualmente nella finestra del suo browser.
  elementInViewport = {
    'first-card-img': false,
    'second-card-img': false
  };

  constructor() { }

  ngOnInit() {
  }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (visible) {
      this.elementInViewport[target.id] = true;
    }
  }

}
