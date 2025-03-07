import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventData } from 'src/app/printers/interfaces/deal.interface';
import { Package } from 'src/app/printers/interfaces/package.interface';
import { PrintersService } from 'src/app/printers/services/printers.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss'],
})
export class PromocionesComponent implements OnInit {
  thumbsSwiper: any;
  rentPackages: Package[] = [];
  dominantColor: string = '#ffffff';
  currentEvent: EventData | null = null;
  sectionCardHeight: number | null = null;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 8,
    navigation: false,
    autoplay: false,
    pagination: { clickable: true },
    scrollbar: { draggable: true },

    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 24,
        navigation: true,
        autoplay: false,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 16,
        // navigation: true,
        autoplay: false,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
      },
      360: {
        slidesPerView: 2,
        spaceBetween: 8,
        navigation: false,
        autoplay: true,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
      },
    },
    // thumbs: {swiper: this.thumbsSwiper}
  };

  constructor(private router: Router, private printersService: PrintersService) { }

  ngOnInit(): void {
    this.printersService
      .getRentPackages()
      .subscribe((rentPackages: Package[]) => {
        this.rentPackages = rentPackages;
        // console.log(this.rentPackages);
      });

    this.printersService.getEvents().subscribe((events: EventData[]) => {
      // console.log('Fetched events:', events);
      const currentDate = new Date();
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      this.currentEvent =
        events.find((event: EventData) => {
          const eventStart = new Date(event.startDate);
          const eventEnd = new Date(event.endDate);
          return eventStart >= startOfMonth && eventEnd <= endOfMonth;
        }) || null;

      if (this.currentEvent) {
        this.extractDominantColor(this.currentEvent.image);
      }
    });
  }

  extractDominantColor(imageUrl: string): void {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Enables CORS
    img.src = imageUrl;
    img.onload = () => {
      this.sectionCardHeight = img.height; // Set the image height
      // console.log('Image height:', img.height);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const colorCount: { [key: string]: number } = {};
        let maxCount = 0;
        let dominantColor = '';

        for (let i = 0; i < data.length; i += 4) {
          const rgb = `${data[i]},${data[i + 1]},${data[i + 2]}`;
          colorCount[rgb] = (colorCount[rgb] || 0) + 1;
          if (colorCount[rgb] > maxCount) {
            maxCount = colorCount[rgb];
            dominantColor = rgb;
          }
        }

        this.dominantColor = `rgb(${dominantColor})`;
        // console.log('Dominant Color:', this.dominantColor);
        // Utilize this.dominantColor as needed
      }
    };

    img.onerror = () => {
      console.error('Failed to load image for color extraction.');
    };
  }
}
