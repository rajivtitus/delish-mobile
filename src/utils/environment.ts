import { FIREBASE_LOCAL_URL, FIREBASE_LIVE_URL } from "@env";

const isDevelopment = process.env.NODE_ENV === "development";

export const host = isDevelopment ? FIREBASE_LOCAL_URL : FIREBASE_LIVE_URL + "";
