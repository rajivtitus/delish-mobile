export interface Restaurant {
  businessStatus: string;
  geometry: Geometry;
  icon: string;
  name: string;
  openingHours: OpeningHours;
  photos: Photo[];
  placeId: string;
  plusCode: PlusCode;
  priceLevel: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  userRatingsTotal: number;
  vicinity: string;
}
export interface Geometry {
  location: Location;
  viewport: Viewport;
}
export interface Location {
  lat: number;
  lng: number;
}
export interface Viewport {
  northeast: Location;
  southwest: Location;
}
export interface Photo {
  height: number;
  htmlAttributions: string[];
  photoReference: string;
  width: number;
}
export interface PlusCode {
  compoundCode: string;
  globalCode: string;
}
export interface OpeningHours {
  openNow: boolean;
}
