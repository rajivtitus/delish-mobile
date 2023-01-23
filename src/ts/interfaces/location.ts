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

export interface Geocode {
  geometry: Geometry;
}

export interface LocationApiData {
  results: Geocode[];
  status?: string;
}
