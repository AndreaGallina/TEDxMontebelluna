import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

const SUCCESS_MESSAGE = 'La tua richiesta è stata inviata al nostro team. Sarai ricontattato a breve. Grazie!';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamMembers = [
    {
      name: 'Giulia Bizzotto',
      role: 'Licenziatario e Organizzatore',
      imageUrl: 'assets/img/team/giulia.jpg',
      linkedin: 'https://www.linkedin.com/in/giulia-bizzotto-3243107/'
    },
    {
      name: 'Daniele Fogale',
      role: 'Coordinatore Speaker',
      imageUrl: 'assets/img/team/daniele-f.jpg',
      linkedin: 'https://www.linkedin.com/in/daniele-fogale-26793b84/'
    },
    {
      name: 'Jacopo Pellizzari',
      role: 'Coordinatore Speaker',
      imageUrl: 'assets/img/team/jacopo.jpg',
      linkedin: null
    },
    {
      name: 'Lara Citarei',
      role: 'Coordinatore Speaker',
      imageUrl: 'assets/img/team/lara.jpg',
      linkedin: 'https://www.linkedin.com/in/laracitarei/'
    },
    {
      name: 'Francesca Celato',
      role: 'Coordinatore Speaker',
      imageUrl: 'assets/img/team/francesca.jpg',
      linkedin: 'https://www.linkedin.com/in/francescacelato/'
    },
    {
      name: 'Arianna Ceschin',
      role: 'Copy & Ufficio Stampa',
      imageUrl: 'assets/img/team/arianna.jpg',
      linkedin: 'https://www.linkedin.com/in/arianna-ceschin-396a729b/'
    },
    {
      name: 'Beatrice Vecchiato',
      role: 'Coordinatore Traduzioni',
      imageUrl: 'assets/img/team/beatrice.jpg',
      linkedin: 'https://www.linkedin.com/in/beatrice-vecchiato-66b6a2b7/'
    },
    {
      name: 'Francesco Serena',
      role: 'Responsabile Team Comunicazione',
      imageUrl: 'assets/img/team/francesco.jpg',
      linkedin: 'https://www.linkedin.com/in/francescoserenafs/'
    },
    {
      name: 'Enrico Poloni',
      role: 'Team Partners',
      imageUrl: 'assets/img/team/enrico.jpg',
      linkedin: 'https://www.linkedin.com/in/enricopoloni/'
    },
    {
      name: 'Andrea Franchin',
      role: 'Supporto foto e video',
      imageUrl: 'assets/img/team/andrea-f.jpg',
      linkedin: null
    },
    {
      name: 'Emiliano Guerra',
      role: 'Rapporti con la Pubblica Amministrazione',
      imageUrl: 'assets/img/team/emiliano.jpg',
      linkedin: 'https://www.linkedin.com/in/emilianoguerra/'
    },
    {
      name: 'Daniele Bozzano',
      role: 'Fotografo',
      imageUrl: 'assets/img/team/daniele-b.jpg',
      linkedin: 'https://www.linkedin.com/in/daniele-bozzano-75960963/'
    }
  ];

  public loading = false;
  private contactsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private toastr: ToastrService) { }

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
    }, error => {
      this.toastr.error('Si è verificato un\'errore, riprova più tardi');
      this.loading = false;
    });
  }
}
