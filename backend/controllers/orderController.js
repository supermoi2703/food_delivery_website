import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173"

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,

        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });


        const line_items = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Total Payment"
                    },
                    unit_amount: Math.round(req.body.amount * 100) // convert từ USD sang cent
                },
                quantity: 1
            }
        ];

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Internal Server Error' });
    }

};
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

// user orders for frontend 
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing orders for admin dashboard
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}


// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Order status Updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

//api for deleting order
const deleteOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.body.orderId);
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: "Failed to delete order" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, deleteOrder };