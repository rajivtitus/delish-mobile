import { FIREBASE_LOCAL_URL, FIREBASE_LIVE_URL } from "@env";

const isDevelopment = process.env.NODE_ENV === "development";

export const getUrl = (endpoint: string) => {
  let url = "";
  if (isDevelopment) {
    url = `${FIREBASE_LOCAL_URL}${endpoint}&mock=true`;
  } else {
    url = `${FIREBASE_LIVE_URL}${endpoint}`;
  }
  return url;
};
