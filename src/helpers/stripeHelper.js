require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const apiKey = config.stripe.api_key;
const currency = config.stripe.currency;
const stripe = require("stripe")(apiKey);
const { protocol, hostname } = config.server;

module.exports = {
  createSession: async (package, customer, subscribeId, price) => {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${protocol}://${hostname}/chefk-frontend/#/paymentSuccess?session_id={CHECKOUT_SESSION_ID}&subscribe_id=${subscribeId}`,
        cancel_url: `${protocol}://${hostname}/chefk-frontend/#/paymentCancel`,
        customer,
        line_items: [
          {
            price,
            quantity: 1,
          },
        ],
      });
      return session;
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  createProduct: async (name, description, active) => {
    try {
      const product = await stripe.products.create({
        name,
        description,
        active,
      });
      return product;
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateProduct: async (productId, name, description, active) => {
    try {
      const product = await stripe.products.update(productId, {
        name,
        description,
        active,
      });
      return product;
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const deleted = await stripe.products.del(productId);
      return deleted;
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  createPrice: async (amount, intervalCount, product) => {
    try {
      const price = await stripe.prices.create({
        unit_amount: Number(amount) * 100,
        currency: currency,
        // recurring: { interval: "month", interval_count: intervalCount },
        product,
      });
      return price;
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  createPaymentIntent: async (amount, paymentMethodId) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        payment_method_types: ["card"],
        payment_method: paymentMethodId,
      });
      return paymentIntent;
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
