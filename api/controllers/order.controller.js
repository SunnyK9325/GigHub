import createError from '../utils/createError.js';
import Order from '../models/order.model.js';
import Gig from '../models/gig.model.js';
import Stripe from "stripe";

export const intent = async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE);

    try {
        const gig = await Gig.findById(req.params.id);

        // Increment the sales property
        gig.sales += 1;
        await gig.save();

        // Create a payment intent on Stripe's end
        const paymentIntent = await stripe.paymentIntents.create({
            amount: gig.price * 100,
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        // Create a new order
        const newOrder = new Order({
            gigId: gig._id,
            img: gig.cover,
            title: gig.title,
            buyerId: req.userId,
            sellerId: gig.userId,
            price: gig.price,
            payment_intent: paymentIntent.id,
        });

        // Save the new order
        await newOrder.save();

        // Send the client_secret to the client
        res.status(200).send({
            client_secret: paymentIntent.client_secret,
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};


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

