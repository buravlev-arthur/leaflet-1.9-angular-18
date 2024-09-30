import {
  Component,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';
import 'leaflet.markercluster';
import type {
  Map,
  LatLngExpression,
  CircleMarker,
  MarkerClusterGroup,
  MarkerClusterGroupOptions,
  LeafletMouseEvent,
} from 'leaflet';
import type { MarkerData } from '../types';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @Input() data: MarkerData[] = [];
  @Input() coords: LatLngExpression = [55.751244, 37.618423];
  @Input() zoom: number = 10;
  @Input() minZoom: number = 3;
  @Input() maxZoom: number = 17;
  @Input() tilesetUrl: string =
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

  @Output() onMapClick = new EventEmitter<LeafletMouseEvent>();
  @Output() onMarkerClick = new EventEmitter<LeafletMouseEvent>();

  private leaflet = window.L;
  private map: Map | null = null;
  private markers: MarkerClusterGroup | null = null;
  private clusterOptions: MarkerClusterGroupOptions = {
    spiderfyOnMaxZoom: true,
    zoomToBoundsOnClick: true,
    showCoverageOnHover: false,
  };

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
    this.setMarkers();
    this.defineEvents();
  }

  initMap(): void {
    console.log('L: ', window.L);
    this.map = this.leaflet.map('map');
    this.map.setView(this.coords, this.zoom);
    this.leaflet
      .tileLayer(this.tilesetUrl, {
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
      })
      .addTo(this.map);
  }

  setMarkers(): void {
    if (this.map === null) {
      return;
    }

    this.markers = this.leaflet.markerClusterGroup(this.clusterOptions);

    this.data.forEach(({ coords, content }) => {
      const marker: CircleMarker = this.leaflet
        .circleMarker(coords, {
          radius: 12,
          weight: 1,
          color: 'green',
          fillOpacity: 1,
          fillColor: 'springgreen',
        })
        .bindPopup(content);

      this.markers?.addLayer(marker);
    });

    this.map.addLayer(this.markers);
  }

  defineEvents(): void {
    if (!this.map || !this.markers) {
      return;
    }

    this.map.on('click', ($event: LeafletMouseEvent) =>
      this.onMapClick.emit($event)
    );

    this.markers?.on('click', ($event: LeafletMouseEvent) => {
      this.onMarkerClick.emit($event);
    });
  }
}
