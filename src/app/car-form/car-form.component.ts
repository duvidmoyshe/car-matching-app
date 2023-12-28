import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { colorOptions, hobbies } from '../const/colors.const';
import { colors, motorTypes, seats } from './../const/colors.const';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent {
  carForm!: FormGroup;
  hobbies = hobbies;
  motorTypes = motorTypes;
  seats = seats;
  colors = colors;
  selectedColor: string = '#00ff00';
  colorOptions = colorOptions;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    this.carForm = this.fb.group({
      fullName: [''],
      gender: [''],
      email: ['', [Validators.email]],
      birthDate: [''],
      address: [''],
      city: [''],
      country: [''],
      hobbies: [''],
      favoriteColor: [''],
      numOfSeats: ['', [Validators.min(2), Validators.max(7)]],
      motorType: [''],
    });
  }



  submitForm(): void {
    if (this.carForm.valid) {
      console.log('Form submitted:', this.carForm.value);
      const storedData = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')!) : [];
      storedData.push(this.carForm.value);
      localStorage.setItem('formData', JSON.stringify(storedData));
      console.log('Request sent. A mail with your match will be sent to you.');
      this.carForm.reset();
    } else {
      this.markFormGroupTouched(this.carForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onColorChange(event: any) {
    console.log('Selected Color:', event);
  }

}
