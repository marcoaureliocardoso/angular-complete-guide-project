import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public selectedFeatureName: string = 'recipes';

  constructor(private router: Router, private storageService: DataStorageService) {}

  updateUi(event: Event) {
    this.selectedFeatureName = (<HTMLFormElement>event.target).value;
    switch (this.selectedFeatureName) {
      case 'recipes':
        this.router.navigate(['/recipes']);
        break;
      case 'list':
        this.router.navigate(['/shopping-list']);
        break;
    }
  }

  updateSelect(featureName: string) {
    this.selectedFeatureName = featureName;
  }

  saveData() {
    this.storageService.storeRecipes();
  }

  fetchData() {
    this.storageService.fetchRecipes().subscribe();
  }
}
