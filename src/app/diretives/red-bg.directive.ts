import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRedBg]'
})
export class RedBgDirective {
  private el: ElementRef;
  //接受值
  @Input('appRedBg') highlightColor: string;
  constructor(el: ElementRef) {
    this.el = el;
  }
  //事件监听
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'red');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  //创建方法
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
