if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not set in environment variables');
}
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { items } = JSON.parse(event.body);

    if (!items || items.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No items provided' }),
      };
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: (item.currency || 'eur').toLowerCase(),
        product_data: {
          name: item.title,
          images: item.images && item.images.length > 0 ? [item.images[0]] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    }));

    const siteUrl = process.env.URL || 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/shop`,
      // Collect customer email
      customer_creation: 'always',
      // Collect shipping address for physical goods
      shipping_address_collection: {
        allowed_countries: [
          'FR', 'DE', 'GB', 'ES', 'IT', 'NL', 'BE', 'PT', 'AT', 'CH',
          'IE', 'LU', 'US', 'CA', 'AU'
        ],
      },
      // Store order metadata
      metadata: {
        item_count: items.reduce((sum, i) => sum + i.quantity, 0).toString(),
        item_ids: items.map(i => i.id).join(', '),
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ id: session.id, url: session.url }),
    };
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create checkout session: ' + error.message }),
    };
  }
};
