import { NextRequest, NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, successUrl, cancelUrl, customerEmail } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url:
        successUrl ||
        `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?plan=${priceId}`,
      cancel_url:
        cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      customer_email: customerEmail || undefined, // Set email if provided
      allow_promotion_codes: true,
      billing_address_collection: 'auto', // Make billing address optional
      metadata: {
        source: 'chatro-ai',
        priceId,
        userEmail: customerEmail || 'anonymous',
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);

    // Provide more specific error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes('No such price')) {
        return NextResponse.json(
          { error: 'Invalid price ID provided' },
          { status: 400 }
        );
      }
      if (error.message.includes('Invalid price')) {
        return NextResponse.json(
          { error: 'Invalid price configuration' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
