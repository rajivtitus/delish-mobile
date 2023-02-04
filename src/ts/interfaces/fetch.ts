export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Headers = { "Content-Type": "application/json" };

export interface FetchOptions {
  method: Method;
  headers: Headers;
  body?: string;
  credentials?: RequestCredentials;
}
