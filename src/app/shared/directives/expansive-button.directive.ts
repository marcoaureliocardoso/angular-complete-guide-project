import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appExpansiveButton]',
})
export class ExpansiveButtonDirective {
  @HostBinding('class.btn-warning') isExpanded = false;
  @HostBinding('style.textTransform') textTransform = 'none';

  constructor() {}

  @HostListener('mouseenter') mouseOver() {
    this.isExpanded = true;
    this.textTransform = 'uppercase';
  }

  @HostListener('mouseleave') mouseLeave() {
    this.isExpanded = false;
    this.textTransform = 'none';
  }
}
