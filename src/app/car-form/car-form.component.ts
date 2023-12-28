import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { colorOptions, hobbies } from '../const/colors.const';
import { MockLocationService } from '../services/mock-location.service';
import { motorTypes, seats } from './../const/colors.const';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
})
export class CarFormComponent implements OnInit {
  carForm!: FormGroup;
  hobbies = hobbies;
  motorTypes = motorTypes;
  seats = seats;
  colorOptions = colorOptions;
  cities$: Observable<{ id: number; value: string; }[] | undefined> | undefined;
  countries$: Observable<{ id: number; value: string; }[] | undefined> | undefined;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private mockLocationService: MockLocationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadCountries();
  }

  createForm(): void {
    this.carForm = this.fb.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      hobbies: ['', Validators.required],
      favoriteColor: ['', Validators.required],
      numOfSeats: ['', [Validators.min(2), Validators.max(7), Validators.required]],
      motorType: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.carForm.valid) {
      const storedData = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')!) : [];
      storedData.push(this.carForm.value);
      localStorage.setItem('formData', JSON.stringify(storedData));
      this.snackBar.open('Request sent. A mail with your match will be sent to you.', 'Close', {
        duration: 3000,
      });
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

  loadCountries(): void {
    this.countries$ = this.mockLocationService.getCountries();
  }

  onCountryChange(event: any): void {
    const selectedCountry = this.carForm.get('country')?.value;
    if (selectedCountry) {
      this.cities$ = this.mockLocationService.getCitiesInCountry(selectedCountry).pipe(
        map(cities => cities.value)
      )
    }
  }

}
