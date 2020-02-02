import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {PrivacyComponent} from '../privacy/privacy.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

const SUCCESS_MESSAGE = 'La tua richiesta è stata inviata al nostro team. Sarai ricontattato a breve. Grazie!';

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.css']
})
export class ContattiComponent implements OnInit {

  public loading = false;
  private contactsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.contactsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      msg: ['', Validators.required],
      recaptcha: ['', Validators.required],
      privacy: ['', Validators.requiredTrue]
    });
  }

  onSubmit() {
    const body = 'name=' + this.contactsForm.get('firstName').value
      + '&surname=' + this.contactsForm.get('lastName').value
      + '&email=' + this.contactsForm.get('email').value
      + '&phone=' + this.contactsForm.get('phone').value
      + '&msg=' + this.contactsForm.get('msg').value
      + '&captcha_response=' + this.contactsForm.get('recaptcha').value
    ;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.loading = true;

    this.http.post(
      'https://www.tedxmontebelluna.com/core/contact.php',
      body,
      {
        headers,
        responseType: 'text'
      }
    ).subscribe(response => {
      if (response.startsWith(SUCCESS_MESSAGE)) {
        this.toastr.success(response);
        this.contactsForm.reset();
      } else {
        this.toastr.error(response);
      }
      this.loading = false;
    }, () => {
      this.toastr.error('Si è verificato un\'errore, riprova più tardi');
      this.loading = false;
    });
  }

  openPrivacyModal() {
    this.modalService.open(PrivacyComponent, { size: 'lg' });
  }

}
