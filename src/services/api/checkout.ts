import { getUrl } from "../../utils/environment";
import { FetchOptions } from "../../ts/interfaces/fetch";
import { PaymentSheetApiData } from "../../ts/interfaces/checkout";

export const paymentSheetParamsRequest = (
  amount: number
): Promise<PaymentSheetApiData> => {
  const fetchOptions: FetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  };
  const url = getUrl("/paymentSheet");

  return fetch(url, fetchOptions)
    .then((res) => res.json())
    .catch((_) => {
      throw Error("Something went wrong. Please try again later!");
    });
};
