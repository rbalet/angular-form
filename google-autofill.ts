import { FormBuilder, FormGroup, Validators } from '@angular/forms'

export class ContactFormComponent implements OnInit {
  contactForm: FormGroup
  submitted = false

  submittedResult: any
  showMessage = false

  constructor(private fB: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fB.group({
      name: ['', [Validators.max(50)]],
      email: ['', [Validators.email]],
      tel: ['', [Validators.pattern(/[0-9\+\-\ ]/)]],
      plz: ['', [Validators.pattern(/[0-9]{4}/)]],
    })
  }

  get f() {
    return this.contactForm.controls
  }

  ctrlForm(bool = true) {
    // On submit hover
    if (!bool) {
      this.showMessage = true
    } else {
      this.showMessage = false
    }
  }

  onSubmit() {
    this.submitted = true

    if (this.contactForm.invalid) {
      return
    }

    this.formService
      .sendForm('contact', this.contactForm.value)
      .then(() => {
        this.submittedResult = true
        this.contactForm.reset()
      })
      .catch(() => {
        this.submittedResult = false
      })
  }
}
