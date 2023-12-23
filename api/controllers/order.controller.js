import createError from '../utils/createError.js';
import Order from '../models/order.model.js';
import Gig from '../models/gig.model.js';
import Stripe from "stripe";

export const intent = async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE);

    const gig = await Gig.findById(req.params.id);

    // This function is going to create a payment intent on Stripe's end. It will return a client secret, which we will use to create a payment method on the client side. The payment method will be used to confirm the payment intent, which will then be used to create an order on our end.
    const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price * 100,
        currency: "inr",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    const newOrder = new Order({
        gigId: gig._id,
        img: gig.cover,
        title: gig.title,
        buyerId: req.userId,
        sellerId: gig.userId,
        price: gig.price,
        payment_intent: paymentIntent.id,
    });

    await newOrder.save();
    res.status(200).send({
        client_secret: paymentIntent.client_secret
    });
}

export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),     // The reason for assigning req.userId to either sellerId or buyerId is to filter the orders based on the user's role. Sellers have orders where they are the sellers, and buyers have orders where they are the buyers. This helps in displaying the relevant orders to the user based on their role in the transaction.
            isCompleted: true,
        });
        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
}

export const confirm = async (req, res, next) => {
    try {
        const order = await Order.findOneAndUpdate({
            payment_intent: req.body.payment_intent,
        },
            {
                $set: {
                    isCompleted: true,
                }
            });
        res.status(200).send("Order has been confirmed!");

    } catch (err) {
        next(err);
    }
}

