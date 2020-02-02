import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ResponseEntity} from './shared/response-entity';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PrivacyComponent} from './privacy/privacy.component';

const NEWSLETTER_SUBSCRIPTION_API = 'https://www.tedxmontebelluna.com/core/newsletter_subscribe.php';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('collapsingNavbar', {static: false}) collapsingNavbar: ElementRef;

  loading = false;
  isNavbarCollapsed = true;
  newsletterForm: FormGroup;

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private toastr: ToastrService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.newsletterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    const payload = 'email=' + this.newsletterForm.get('email').value
      + '&status=subscribed'
      + '&firstName=' + this.newsletterForm.get('firstName').value
      + '&lastName=' + this.newsletterForm.get('lastName').value;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.loading = true;

    this.http.post<ResponseEntity>(
      NEWSLETTER_SUBSCRIPTION_API,
      payload,
      {
        headers,
      }
    ).subscribe((response) => {
      if (response.status === 200) {
        this.toastr.success('La richiesta di iscrizione è andata a buon fine. Riceverai a breve una mail di conferma. Grazie!');
        this.newsletterForm.reset();
      } else {
        this.toastr.error('Si è verificato un\'errore, riprova più tardi');
      }
      this.loading = false;
    }, error => {
      console.error(error);
      this.toastr.error('Si è verificato un\'errore, riprova più tardi');
      this.loading = false;
    });
  }

  /**
   * workaround per bug della navbar che ha overflow hidden quando viene
   * collassata in modalità responsive, cosa che non permette di vedere il dropdown
   * se si ritorna in modalità non responsive.
   */
  onNavbarCollapsed() {
    if (!!this.collapsingNavbar) {
      this.collapsingNavbar.nativeElement.style.overflow = 'inherit';
    }
  }

  openPrivacyModal() {
    this.modalService.open(PrivacyComponent, { size: 'lg' });
  }
}
