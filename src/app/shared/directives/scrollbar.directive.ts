import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tcpScrollbar]',
  standalone: true,
})
export class ScrollbarDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;

    this.renderer.setStyle(element, 'overflow', 'auto');
    this.renderer.setStyle(element, 'scrollbar-width', 'thin');
    this.renderer.setStyle(
      element,
      'scrollbar-color',
      'hsla(57, 91%, 91%, 1) transparent'
    );

    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar {
        width: 2px;
      }
      ::-webkit-scrollbar-thumb {
        background: hsla(57, 91%, 91%, 1);
     
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
    `;
    document.head.appendChild(style);
  }
}
