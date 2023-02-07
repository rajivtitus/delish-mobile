import * as functions from "firebase-functions";
import { Client } from "@googlemaps/google-maps-services-js";
import Stripe from "stripe";

import { geocodeRequest } from "./geocode";
import { placesRequest } from "./places";
import { createPaymentSheet } from "./payments";

const client = new Client({});
const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2022-11-15",
});

export const geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response, client);
});

export const placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response, client);
});

export const paymentSheet = functions.https.onRequest((request, response) => {
  createPaymentSheet(request, response, stripe);
});
