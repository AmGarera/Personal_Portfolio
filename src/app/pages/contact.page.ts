
 import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  styles: [
    `
    @media (prefers-color-scheme: dark) {
        .dark-mode {
          background-color: #333;
          color: #fff;
        }
        .dark-mode input, .dark-mode textarea {
          background-color: #555;
          color: #fff;
        }
        .dark-mode button {
          background-color: #444;
          color: #fff;
        }
      }
    `,
  ],
  template: `
    <div class="container mx-auto px-4">
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
          <input type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" formControlName="name" required>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input type="email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" formControlName="email" required>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="message">Message</label>
          <textarea id="message" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" formControlName="message" required></textarea>
        </div>

        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" [disabled]="!contactForm.valid">Submit</button>
      </form>
    </div>
  `,
})
export default class ContactPage {

  constructor(private formBuilder: FormBuilder) {
    this.createContactForm();
  }

  contactForm!: FormGroup;

  createContactForm(){
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);
      this.contactForm.reset();
    }
  }
}
