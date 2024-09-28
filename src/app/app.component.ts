import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { markersData } from './const';
import type { MarkerData } from './types';
import type { LeafletMouseEvent } from 'leaflet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  markersData: MarkerData[] = markersData;
  constructor() {}

  onMapClick($event: LeafletMouseEvent): void {
    console.log('map click: ', $event);
  }

  onMapClusterClick($event: LeafletMouseEvent): void {
    console.log('cluster click: ', $event);
  }

  onMapMarkerClick($event: LeafletMouseEvent): void {
    console.log('marker click: ', $event);
  }
}
