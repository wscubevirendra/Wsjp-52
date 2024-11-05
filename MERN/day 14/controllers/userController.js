const userModel = require('../models/userModel')

class userController {
    userCreate(data) {
        return new Promise(
            (resolve, reject) => {
                try {
                    if (data.name == "" || data.email == "" || data.contact == "" || data.password == "") {
                        resolve(
                            {
                                msg: "All field required",
                                status: 0
                            }
                        )
                        return

                    }


                    const user = new userModel(
                        {
                            name: data.name,
                            email: data.email,
                            contact: data.contact,
                            password: data.password,

                        }
                    )
                    user.save()
                        .then(
                            () => {
                                resolve(
                                    {
                                        msg: "User Created Successfully",
                                        status: 1
                                    }
                                )
                            }
                        )
                        .catch(
                            () => {
                                reject(
                                    {
                                        msg: "User Not Created ",
                                        status: 0
                                    }
                                )
                            }
                        )


                } catch (error) {
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

    userGet(id) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    let users;
                    if (id) {
                        users = await userModel.findById(id)
                    } else {
                        users = await userModel.find()
                    }

                   resolve(
                        {
                            msg: Array.isArray(users) ? users.length : 1 + " users found",
                            status: 1,
                            users
                        }
                    )

                } catch (error) {
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

    deleteUser(){
        return new Promise(
            (resolve,reject)=>{

            }
        )
    }

}


module.exports = userController;