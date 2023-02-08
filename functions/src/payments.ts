import Stripe from "stripe";
import { Request, Response } from "firebase-functions";

interface RequestBody {
  amount: number;
}

export const createPaymentSheet = async (
  request: Request,
  response: Response,
  stripe: Stripe
) => {
  const { amount }: RequestBody = request.body;

  if (!amount) {
    response.status(400);
    response.json({ error: { message: "Payment amount not provided" } });
    return;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "cad",
    });

    response.json({
      paymentIntent: paymentIntent.client_secret,
    });
  } catch (err) {
    response.status(400);
    response.json(err);
  }
};
