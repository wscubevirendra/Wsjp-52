const AdminModel = require("../models/AdminModel")
const { encryptedPassword } = require("../helping")


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

    AdminLogin(data) {
        return new Promise(
            async (resolve, reject) => {
                try {

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