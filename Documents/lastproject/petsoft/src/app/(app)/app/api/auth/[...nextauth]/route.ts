// src/app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/server-utils";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    const session = await checkAuth();

    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      line_items: [
        {
          price: "price_1OfpJ7FIW685mC8GCahpbCed",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
      cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout session creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
