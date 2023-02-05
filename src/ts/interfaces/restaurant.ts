import { Geometry } from "./location";

export interface Restaurant {
  businessStatus: string;
  geometry: Geometry;
  icon: string;
  name: string;
  openingHours: OpeningHours;
  photos: string[];
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
  address: string;
  isOpenNow: boolean;
  isClosedTemporarily: boolean;
}

export interface PlusCode {
  compoundCode: string;
  globalCode: string;
}
export interface OpeningHours {
  openNow: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
}
