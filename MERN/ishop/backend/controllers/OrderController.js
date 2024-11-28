
const CartModel = require("../models/CartModel")
const OrderModel = require("../models/OrderModel")


class OrderController {
    placeOrder(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const { user_id, address, paymentMode, order_total } = data
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

}

module.exports = OrderController