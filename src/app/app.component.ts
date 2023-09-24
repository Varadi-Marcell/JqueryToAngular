import { Component, AfterViewInit, ElementRef, Renderer2, QueryList, ViewChildren } from '@angular/core';
import { RwdImageMaps } from "./rwd-image-maps.directive";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren(RwdImageMaps) imageMaps: QueryList<RwdImageMaps>;


  myTrigger(arg: string) {

    alert(arg + " clicked");
  }


  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
  }

}
