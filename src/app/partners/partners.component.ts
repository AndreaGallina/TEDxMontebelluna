import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {PrivacyComponent} from '../privacy/privacy.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  private SUCCESS_MESSAGE = 'La tua richiesta è stata inviata al nostro team. Sarai ricontattato a breve. Grazie!';

  private partnershipRequestForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.partnershipRequestForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      referente: [''],
      email: ['', Validators.required],
      phone: [''],
      recaptcha: ['', Validators.required],
      privacy: ['', Validators.requiredTrue]
    });
  }

  onSubmit() {
    const body = 'name=' + this.partnershipRequestForm.get('companyName').value
      + '&email=' + this.partnershipRequestForm.get('email').value
      + '&phone=' + this.partnershipRequestForm.get('phone').value
      + '&captcha_response=' + this.partnershipRequestForm.get('recaptcha').value
      + '&notes='
    ;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post(
      'https://www.tedxmontebelluna.com/core/sponsor.php',
      body,
      {
        headers,
        responseType: 'text'
      }
    ).subscribe(response => {
      console.log(response);
      if (response === this.SUCCESS_MESSAGE) {
        this.toastr.success(response);
      } else {
        this.toastr.error(response);
      }
    }, error => this.toastr.error('Si è verificato un\'errore, riprova più tardi'));
  }

  openPrivacyModal() {
    this.modalService.open(PrivacyComponent, { size: 'lg' });
  }

}
