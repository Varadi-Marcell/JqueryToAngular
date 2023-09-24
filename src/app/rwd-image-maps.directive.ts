import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rwdimgmap]'
})
export class RwdImageMaps {
  private w: number;
  private h: number;

  constructor(public el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize();
  }

  @HostListener('load', ['$event.target'])
  onLoad(img) {
    this.w = img.width;
    this.h = img.height;
    this.resize();
  }

  resize() {
    if (!this.w || !this.h) {
      const temp = new Image();
      temp.src = this.el.nativeElement.src;
      if (!this.w) this.w = temp.width;
      if (!this.h) this.h = temp.height;
    }

    const wPercent = this.el.nativeElement.width / 100;
    const hPercent = this.el.nativeElement.height / 100;
    console.log(wPercent,hPercent);
    const map = this.el.nativeElement.useMap.replace('#', '');
    const areas = document.querySelectorAll(`map[name="${map}"] area`);

    areas.forEach((area: HTMLAreaElement) => {
      if (!area.dataset['coords']) {
        area.dataset['coords'] = area.coords;
      }

      const coords = area.dataset['coords'].split(',');
      const coordsPercent = new Array(coords.length);

      for (let i = 0; i < coordsPercent.length; ++i) {
        if (i % 2 === 0) {
          coordsPercent[i] = parseInt(((Number(coords[i]) / this.w) * 100 * wPercent).toString(), 10);
        } else {
          coordsPercent[i] = parseInt(((Number(coords[i]) / this.h) * 100 * hPercent).toString(), 10);
        }
      }
      area.coords = coordsPercent.toString();
    });
  }
}
