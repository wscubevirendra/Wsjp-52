const AdminModel = require("../models/AdminModel")
const { encryptedPassword, decryptedPassword, adminToken } = require("../helping")


class AdminController {
    register(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const admin = await AdminModel.findOne({ email: data.email })
                    if (admin) {
                        reject(
                            {
                                msg: "This Email Already Exits",
                                status: 0
                            }
                        )

                    } else {

                        const AdminData = new AdminModel(
                            {
                                name: data.name,
                                email: data.email,
                                contact: data.contact,
                                password: encryptedPassword(data.password)

                            }
                        )
                        AdminData.save()
                            .then(
                                () => {
                                    resolve(
                                        {
                                            msg: "Admin created",
                                            status: 1
                                        }
                                    )
                                }
                            ).catch(
                                (error) => {
                                    console.log(error)
                                    reject(
                                        {
                                            msg: "Unable to create Admin",
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
                    const admin = await AdminModel.findOne({ email: data.email })
                    if (admin) {
                        if (data.password == decryptedPassword(admin.password)) {
                            resolve(
                                {
                                    msg: "Login Successfully",
                                    status: 1,
                                    admin: { ...admin.toJSON(), password: null },
                                    token: adminToken(admin.toJSON())
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

module.exports = AdminController