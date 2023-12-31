import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  public selectedFeatureName: string = 'recipes';

  ngOnInit() {
    this.featureSelected.emit('recipes');
  }

  updateUiBySelect(event: Event) {
    const featureName: string = (<HTMLFormElement>event.target).value;
    this.updateUiByName(featureName);
  }

  updateUiByName(featureName: string) {
    this.selectedFeatureName = featureName;
    this.featureSelected.emit(featureName);
  }
}
