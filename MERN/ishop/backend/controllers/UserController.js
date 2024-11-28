const UserModel = require("../models/UserModel")
const CartModel = require("../models/CartModel")
const { encryptedPassword, decryptedPassword, adminToken } = require("../helping")


class UserController {
    register(data) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    if (data.password != data.confirmPassword) {
                        return reject(
                            {
                                msg: "Password do not match",
                                status: 0
                            }
                        )

                    }

                    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
                        return reject(
                            {
                                msg: "All field required",
                                status: 0
                            }
                        )

                    }
                    const user = await UserModel.findOne({ email: data.email })
                    if (user) {
                        reject(
                            {
                                msg: "This Email Already Exits",
                                status: 0
                            }
                        )

                    } else {

                        const UserData = new UserModel(
                            {
                                name: data.name,
                                email: data.email,
                                contact: data.contact,
                                password: encryptedPassword(data.password)

                            }
                        )
                        UserData.save()
                            .then(
                                () => {
                                    resolve(
                                        {
                                            msg: "User created",
                                            status: 1,
                                            user: { ...UserData.toJSON(), password: null },
                                            token: adminToken(UserData.toJSON())
                                        }
                                    )
                                }
                            ).catch(
                                (error) => {
                                    console.log(error)
                                    reject(
                                        {
                                            msg: "Unable to create User",
                                            status: 0
                                        }
                                    )
                                }
                            )

                    }



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

    login(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const user = await UserModel.findOne({ email: data.email })
                    if (user) {
                        if (data.password == decryptedPassword(user.password)) {
                            resolve(
                                {
                                    msg: "Login Successfully",
                                    status: 1,
                                    user: { ...user.toJSON(), password: null },
                                    token: adminToken(user.toJSON())
                                }
                            )
                        } else {
                            reject(
                                {
                                    msg: "Incorrect Password",
                                    status: 0
                                }
                            )

                        }


                    } else {
                        reject(
                            {
                                msg: "Email Not Exits",
                                status: 0
                            }
                        )
                    }

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

    moveTocart(user_id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const cartData = data ? JSON.parse(data.cartData) : null;
                if (cartData) {
                    const allPromise = cartData.map(async (cd) => {
                        const existingCartItem = await CartModel.findOne({ user_id, product_id: cd.product_id });
                        if (existingCartItem) {
                            // Increment quantity
                            await CartModel.updateOne(
                                { _id: existingCartItem._id },
                                { $inc: { qty: Number(cd.qty) } }
                            );
                        } else {
                            // Insert new item
                            await new CartModel({
                                user_id,
                                product_id: cd.product_id,
                                qty: cd.qty
                            }).save();
                        }
                    });

                    await Promise.all(allPromise);

                    const latestCart = await CartModel.find({ user_id }).populate('product_id', '_id original_price final_price');;
                    resolve({
                        latestCart,
                        status: 1,
                        msg: "Move to DB successful"
                    });
                } else {
                    throw new Error("Cart data is null");
                }
            } catch (error) {
                console.error(error);
                reject({
                    msg: "Internal Server Error",
                    status: 0
                });
            }
        });
    }


     addToCart(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const cartExists = await CartModel.findOne({ user_id: data.user_id, product_id: data.product_id });
                if (cartExists) {
                    await CartModel.updateOne(
                        {
                            _id: cartExists._id
                        },
                        {
                            $inc: {
                                qty: 1
                            }
                        }
                    )
                    resolve({
                        msg: "Cart updated",
                        status: 1
                    })
                } else {
                    const cart = new CartModel({
                        user_id: data.user_id,
                        product_id: data.product_id,
                        qty: 1
                    })
                    await cart.save();
                    resolve({
                        msg: "Added to cart",
                        status: 1
                    })
                }
            }  catch (error) {
                console.error(error);
                reject({
                    msg: "Internal Server Error",
                    status: 0
                });
            }
        });
       
    }




}

module.exports = UserController