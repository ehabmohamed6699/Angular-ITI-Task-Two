import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appProdCart]'
})
export class ProdCartDirective {
  @Input('appProdCart') shadowSize: string = 'shadow-lg';
  @Input() bgColor: string = 'bg-base-200';
  @Input() borderColor: string = 'border-secondary';
  @Input() isLast: boolean = false;
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(){
    this.elementRef.nativeElement.classList.add(this.bgColor,this.isLast?"":'border-0', this.isLast?"border-red-500":this.borderColor);
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.classList.add(this.shadowSize);
    this.elementRef.nativeElement.classList.remove('shadow-md');
    if(!this.isLast){
      this.elementRef.nativeElement.classList.add('border-2');
      this.elementRef.nativeElement.classList.remove('border-0');
    }
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.shadowSize);
    this.elementRef.nativeElement.classList.add('shadow-md');
    if(!this.isLast){
      this.elementRef.nativeElement.classList.add('border-0');
      this.elementRef.nativeElement.classList.remove('border-2');
    }
  }
}
