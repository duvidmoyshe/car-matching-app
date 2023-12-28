// dashboard.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { colors } from '../const/colors.const';
import { CarData } from '../models/car-data.model';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion();
  landingPageData: CarData[] = [];
  selectedChart: 'colors' | 'hobbies' | 'ageGroup' = 'colors'; // Default to 'colors'
  dataSource!: MatTableDataSource<CarData | any>;
  // dashboard.component.ts

  displayedColumns: string[] = ['motorType', 'male', 'female'];
  motorTypeData: { motorType: string; maleCount: number; femaleCount: number }[] = [];

  isAccordionOpened: boolean = false;

  ngOnInit(): void {
    this.loadLocalStorageData();
    this.renderBarChart();
    this.renderPieChart();
  }

  toggleAccordion(): void {
    if (this.accordion) {
      this.isAccordionOpened = !this.isAccordionOpened;
      this.isAccordionOpened ? this.accordion.openAll() : this.accordion.closeAll();
    }
  }

  private loadLocalStorageData(): void {
    const landingPageDataStr = localStorage.getItem('formData');
    if (landingPageDataStr) {
      this.landingPageData = JSON.parse(landingPageDataStr);
      this.dataSource = new MatTableDataSource(this.landingPageData);
      this.calculateMotorTypeData();
    }
  }

  calculateMotorTypeData(): void {
    const motorTypeCounts: { [key: string]: { male: number; female: number } } = {};

    this.landingPageData.forEach(data => {
      const motorType = data.motorType;
      const gender = data.gender;

      if (!motorTypeCounts[motorType]) {
        motorTypeCounts[motorType] = { male: 0, female: 0 };
      }

      if (gender === 'male') {
        motorTypeCounts[motorType].male++;
      } else if (gender === 'female') {
        motorTypeCounts[motorType].female++;
      }
    });

    this.motorTypeData = Object.keys(motorTypeCounts).map(motorType => ({
      motorType,
      maleCount: motorTypeCounts[motorType].male,
      femaleCount: motorTypeCounts[motorType].female,
    }));
    this.dataSource.data = this.motorTypeData;
    console.log(this.motorTypeData)
  }

  renderBarChart() {
    const colorsData = this.extractColorsData();
    const myChart = new Chart('colorsChart', {
      type: 'bar',
      data: {
        labels: colors,
        datasets: this.getDataSets(colorsData),
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false, // Set display to true initially
          },
        },
      },
    });
  }

  renderPieChart() {
    const hobbiesData = this.extractHobbiesData();
    const myChart = new Chart('hobbiesChart', {
      type: 'pie',
      data: {
        labels: hobbiesData.map(hobbyData => hobbyData?.hobby),
        datasets: [{
          data: hobbiesData.map(hobbyData => hobbyData?.count),
          backgroundColor: ['#FF5733', '#FFD700', '#00FF00', '#3498db', '#9b59b6'],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  private extractHobbiesData(): { hobby: string; count: number }[] {
    let hobbyCounts: { [key: string]: number } = {};

    // Count occurrences of each hobby
    this.landingPageData.forEach(data => {
      const hobbies = data?.hobbies;
      console.log(data)
      // Assuming hobbies is an array, iterate through it
      hobbies?.forEach(hobby => {
        hobbyCounts[hobby] = (hobbyCounts[hobby] || 0) + 1;
      });
    });

    // Convert hobby counts to an array of objects
    const hobbiesData = Object.keys(hobbyCounts).map(hobby => {
      return { hobby, count: hobbyCounts[hobby] };
    });

    // Sort hobbies by count in descending order
    hobbiesData.sort((a, b) => b.count - a.count);

    console.log(hobbiesData);
    return hobbiesData;
  }




  getDataSets(colorsData: any[]): any {
    let dataSets = colorsData.map(ageGroupData => {
      return {
        label: ageGroupData.ageGroup,
        data: colors.map(color => ageGroupData.colors[color] || 0),
        backgroundColor: colors,
      };
    });

    return dataSets;
  }


  private extractColorsData(): any[] {
    let colorAgeGroups: { [key: string]: { ageGroup: string; colors: { [key: string]: number } } } = {};

    // Count occurrences of each color and age group
    this.landingPageData.forEach(data => {
      const color = data.favoriteColor;
      const ageGroup = this.calculateAgeGroup(new Date(data.birthDate));

      if (!colorAgeGroups[ageGroup]) {
        colorAgeGroups[ageGroup] = { ageGroup, colors: {} };
      }

      colorAgeGroups[ageGroup].colors[color] = (colorAgeGroups[ageGroup].colors[color] || 0) + 1;
    });

    // Convert color and age group counts to an array of objects
    const colorsData = Object.values(colorAgeGroups);
    console.log(colorsData);
    return colorsData;
  }

  private calculateAgeGroup(birthDate: Date): string {
    const age = this.calculateAge(birthDate);

    if (age >= 18 && age <= 25) {
      return '18-25';
    } else if (age >= 26 && age <= 35) {
      return '26-35';
    } else {
      return 'Other';
    }
  }


  private calculateAge(birthDate: Date): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  }
}
