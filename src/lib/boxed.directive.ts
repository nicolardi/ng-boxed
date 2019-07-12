import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Directive({
// tslint:disable-next-line: directive-selector
  selector: '[boxed]'
})
export class BoxedDirective implements OnInit, OnChanges {
  @Input() boxed;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.wraplement();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.boxed = simpleChanges.boxed.currentValue === '' ? 'div.col-12' : simpleChanges.boxed.currentValue;
  }

  isSeparator(char) {
    const separators = ['.', '#'];
    return separators.indexOf(char) >= 0;
  }

  addClassToElement(element, className) {
      element.className += element.className === '' ? className : ' ' + className;
  }

  setIdToElement(element, id) {
      element.id = id;
  }

  createElementFromToken(token: string) {
    let state = 'ELEMENT';
    let currentSection = '';
    let element: HTMLElement;
    let currentChar;
    let isLastTokenChar = false;

    const tokenLength = token.length;

    for (let j = 0; j < tokenLength; j++) {
      currentChar = token[j];
      isLastTokenChar = j == tokenLength - 1;
      if (!this.isSeparator(currentChar)) {
          currentSection += currentChar;
      }

      if (this.isSeparator(currentChar) || isLastTokenChar) {
          if (state === 'ELEMENT') {
            element = this.renderer.createElement(currentSection);
          }

          if (state === 'CLASS') {
            this.addClassToElement(element, currentSection );
          }

          if (state === 'ID') {
            this.setIdToElement(element, currentSection );
          }

          if (!isLastTokenChar) {

            if (currentChar === '.') {
              state = 'CLASS';
              currentSection = '';
            }

            if (currentChar === '#') {
              state = 'ID';
              currentSection = '';
            }
          }
        }
      }

    return element;
  }

  wraplement() {
    let element: HTMLElement;
    let token: string;

    const tokens = this.boxed.split('>');
    let host = null;

    for (let i = tokens.length - 1; i >= 0; i--) {
      token = tokens[i];
      element = this.createElementFromToken(token);

      if (!host) {
        const target = this.cloneNativeElement();
        element.appendChild(target);
      } else {
        element.appendChild(host.cloneNode(true));
      }
      host = element;
    }
    this.switchNativeWithBoxedElement(host);
  }

  private cloneNativeElement() {
    const content = this.el.nativeElement.cloneNode(true);
    content.removeAttribute('boxed');
    return content;
  }

  private switchNativeWithBoxedElement(host: any) {
    const parent = this.el.nativeElement.parentNode;
    this.renderer.insertBefore(parent, host, this.el.nativeElement);
    this.renderer.removeChild(parent, this.el.nativeElement);
  }
}
