const CartModel = require("../models/CartModel")
const OrderModel = require("../models/OrderModel")
const Razorpay = require('razorpay');
const rozorpayinstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_id,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


class OrderController {
    placeOrder(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const order_total = Math.round(data.order_total)
                    const { user_id, address, paymentMode } = data
                    const Cartmodel = await CartModel.find({ user_id }).populate("product_id", '_id final_price')
                    console.log(Cartmodel)
                    const product_details = Cartmodel.map((cd) => {
                        return {
                            product_id: cd.product_id._id,
                            qty: cd.qty,
                            price: (cd.product_id.final_price * cd.qty),
                            total: order_total
                        }
                    })

                    const order = new OrderModel({
                        user_id: user_id,
                        product_details: product_details,
                        order_total: order_total,
                        payment_mode: paymentMode,
                        shipping_details: address
                    })

                    order.save().then(
                        () => {
                            if (paymentMode == 0) {
                                //COD
                                resolve(
                                    {
                                        msg: "Order Place",
                                        status: 1,
                                        order_id: order._id
                                    }
                                )

                            } else {
                                //online payment
                                this.initPaymentGateWay(order._id, order_total).then(
                                    (rozorpay_order) => {
                                        resolve(
                                            {
                                                msg: "Order place",
                                                status: 1,
                                                rozorpay_order
                                            }
                                        )
                                    }
                                ).catch(
                                    (error) => {
                                        reject(
                                            {
                                                msg: "unable to order",
                                                status: 1

                                            }
                                        )
                                    }
                                )


                            }

                        }
                    ).catch(() => {

                    })

                } catch (error) {
                    console.log(error)
                    reject(
                        {
                            msg: "Internal Server Error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    initPaymentGateWay(order_id, order_total) {
        return new Promise(
            (resolve, reject) => {
                try {
                    var options = {
                        amount: order_total * 100,  // amount in the smallest currency unit
                        currency: "INR",
                        receipt: order_id
                    };
                    rozorpayinstance.orders.create(options, async function (err, order) {
                        if (err) {
                            reject(
                                {
                                    msg: "initPaymentGateWay  error",
                                    status: 0
                                }
                            )

                        } else {
                            await OrderModel.updateOne(
                                {
                                    _id: order_id
                                },
                                {
                                    razorpay_order_id: order.id
                                }
                            )
                            resolve(
                                {
                                    msg: "Order place",
                                    status: 1,
                                    razorpay_order_id: order.id
                                }
                            )

                        }
                    });

                } catch (error) {
                    console.log(error)
                    reject(
                        {
                            msg: "initPaymentGateWay error",
                            status: 0
                        }
                    )

                }

            }
        )

    }

}

module.exports = OrderController