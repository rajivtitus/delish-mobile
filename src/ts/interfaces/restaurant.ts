import { Geometry } from "./location";

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

  //custom props added after receiving data from api
  isOpenNow: boolean;
  isClosedTemporarily: boolean;
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
