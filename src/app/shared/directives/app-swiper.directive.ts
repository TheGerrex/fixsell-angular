import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[appSwiper]'
})
export class SwiperDirective implements OnInit, AfterViewInit {

  @Input() config?: SwiperOptions;

  constructor(private el: ElementRef<SwiperContainer>) {
    console.log('SwiperDirective instantiated');
  }

  ngOnInit(): void {
    console.log('SwiperDirective initialized');
    console.log('Element:', this.el.nativeElement);
  }

  ngAfterViewInit(): void {
    if (this.el.nativeElement) {
      try {
        Object.assign(this.el.nativeElement, this.config);
        this.el.nativeElement.initialize();
      } catch (error) {
        console.error('Error initializing Swiper:', error);
      }
    } else {
      console.error('Swiper container element is not defined');
    }
  }

}
