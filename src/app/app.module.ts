import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CarFormComponent } from './car-form/car-form.component';
import { HeaderComponent } from './header/header.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CarFormComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
