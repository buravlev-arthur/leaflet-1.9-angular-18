import type { LatLngExpression, Content } from 'leaflet';

export interface MarkerData {
  coords: LatLngExpression;
  content: Content;
}
