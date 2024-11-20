const UserModel = require("../models/UserModel")
const { encryptedPassword, decryptedPassword, adminToken } = require("../helping")


class UserController {
    register(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
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
                                            status: 1
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
                                    admin: { ...user.toJSON(), password: null },
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




}

module.exports = UserController