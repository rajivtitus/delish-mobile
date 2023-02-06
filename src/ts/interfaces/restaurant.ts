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
  menu: Menu;

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

export interface Menu {
  breakfast: MenuItem[];
  lunch: MenuItem[];
  dinner: MenuItem[];
  drinks: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
}

export interface RestaurantSummary {
  placeId: string;
  name: string;
  address: string;
  photos: string[];
}
