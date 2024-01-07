import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appExpansiveButton]',
})
export class ExpansiveButtonDirective {
  @HostBinding('class.btn-lg') isExpanded = false;
  @HostBinding('style.backgroundColor') backgroundColor = '#0d6efd';

  constructor() {}

  @HostListener('mouseenter') mouseOver() {
    this.isExpanded = true;
    this.backgroundColor = 'DodgerBlue';
  }

  @HostListener('mouseleave') mouseLeave() {
    this.isExpanded = false;
    this.backgroundColor = '#0d6efd';
  }
}
