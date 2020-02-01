import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, fadeInLeft, fadeInRight, zoomIn} from 'ng-animate';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
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
    ]),
    trigger('fadeIn', [
      state('hidden', style({opacity: 0})),
      state('visible', style({opacity: 1})),
      transition('hidden => visible',
        useAnimation(fadeIn, {
            params: {
              timing: 1
            }
          }
        )
      )
    ])
  ]

})
export class AboutComponent implements OnInit {

  @ViewChild('countriesCounter', {static: false}) countriesCounter: ElementRef;
  @ViewChild('spokenLanguagesCounter', {static: false}) spokenLanguagesCounter: ElementRef;
  @ViewChild('tedEventsCounter', {static: false}) tedEventsCounter: ElementRef;
  @ViewChild('tedxEventsItalyCounter', {static: false}) tedxEventsItalyCounter: ElementRef;
  @ViewChild('plannedEventsItalyCounter', {static: false}) plannedEventsItalyCounter: ElementRef;
  @ViewChild('involvedCitiesCounter', {static: false}) involvedCitiesCounter: ElementRef;

  // Oggetto contenente lo stato delle card.
  // La chiave rappresenta l'id dell'elemento HTML mentre il valore
  // indica se l'elemento è contenuto nella viewport (i.e. ciò che l'utente
  // sta vedendo attualmente nella finestra del suo browser.
  elementInViewport = {
    'first-card-img': false,
    'second-card-img': false,
    'third-card-img': false,
    'world-chart': false,
    'italy-chart': false
  };

  constructor() { }

  ngOnInit() {
  }

  onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (visible) {
      this.animateCounters(target);
      this.elementInViewport[target.id] = true;
    }
  }

  animateCounters(targetElement: Element) {
    if (targetElement.id === 'world-chart' && !this.elementInViewport[targetElement.id]) {
      this.counterFunc(190, 1000, this.countriesCounter);
      this.counterFunc(130, 1000, this.spokenLanguagesCounter);
      this.counterFunc(30000, 1000, this.tedEventsCounter);
    } else if (targetElement.id === 'italy-chart' && !this.elementInViewport[targetElement.id]) {
      this.counterFunc(400, 1000, this.tedxEventsItalyCounter);
      this.counterFunc(30, 1000, this.plannedEventsItalyCounter);
      this.counterFunc(25, 1000, this.involvedCitiesCounter);
    }
  }

  counterFunc(endValue, durationMs, element) {
    const steps = 12;
    const stepCount = Math.abs(durationMs / steps);
    const valueIncrement = (endValue - 0) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = 0;
    let currentSinValue = 0;

    function step() {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

      element.nativeElement.textContent = Math.abs(Math.floor(currentValue));

      if (currentSinValue < Math.PI) {
        window.requestAnimationFrame(step);
      }
    }

    step();
  }

}
