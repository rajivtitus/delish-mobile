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
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-11-15" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "cad",
      customer: customer.id,
    });

    response.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (err) {
    response.status(400);
    response.json(err);
  }
};
