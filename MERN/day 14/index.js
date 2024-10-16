const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');




const server = express();
server.use(express.json());
server.use(cors(
    {
        origin: ["http://localhost:5173", "https://www.wscubetech.com"]
    }
))


const UserData = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 100,
        },
        email: {
            type: String,
            maxLength: 50,
            unique: true
        },
        contact: {
            type: String,
        },
        password: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true //true ---active inactive
        }
    }, {
    timestamps: true
}
)

const userModel = mongoose.model("User", UserData)

server.post(
    "/user/register",
    (req, res) => {
        try {
            if (req.body.name == "" || req.body.email == "" || req.body.contact == "" || req.body.password == "") {
                res.send(
                    {
                        msg: "All field required",
                        status: 0
                    }
                )
                return

            }


            const user = new userModel(
                {
                    name: req.body.name,
                    email: req.body.email,
                    contact: req.body.contact,
                    password: req.body.password,

                }
            )
            user.save()
                .then(
                    () => {
                        res.send(
                            {
                                msg: "User Created Successfully",
                                status: 1
                            }
                        )
                    }
                )
                .catch(
                    () => {
                        res.send(
                            {
                                msg: "User Not Created ",
                                status: 0
                            }
                        )
                    }
                )


        } catch (error) {
            res.send(
                {
                    msg: "Internal Server Error",
                    status: 0
                }
            )
        }
    }
)

server.post(
    "/user/login",
    async (req, res) => {
        try {
            const user = await userModel.findOne({ email: req.body.email });
            console.log(user)
            if (user) {
                if (user.password == req.body.password) {
                    res.send({
                        msg: "Login Successfully",
                        status: 1
                    })
                } else {
                    res.send({
                        msg: "Password does'not match",
                        status: 1
                    })
                }
            } else {
                res.send({
                    msg: "User Not found",
                    status: 1
                })
            }

        } catch (error) {
            res.send(
                {
                    msg: "Internal Server Error",
                    status: 0
                }
            )
        }

    }
)

server.get(
    "/user/:id?",
    async (req, res) => {

        try {
            const id = req.params.id;
            let users;
            if (id) {
                users = await userModel.findById(id)
            } else {
                users = await userModel.find()
            }

            res.send(
                {
                    msg: Array.isArray(users) ? users.length : 1 + " users found",
                    status: 1,
                    users
                }
            )

        } catch (error) {
            res.send(
                {
                    msg: "Internal Server Error",
                    status: 0
                }
            )
        }
    }
)

server.delete(
    "/user/delete/:id",
    async (req, res) => {
        try {
            user = await userModel.findById(req.params.id)
            if (user) {
                userModel.deleteOne({ _id: req.params.id }).then(
                    () => {
                        res.send(
                            {
                                msg: "User Delete Successfully",
                                status: 1
                            }
                        )
                    }
                ).catch(
                    () => {
                        res.send(
                            {
                                msg: "User Not Delete ",
                                status: 0
                            }
                        )
                    }
                )

            } else {
                res.send(
                    {
                        msg: "User Not Found",
                        status: 0
                    }
                )
            }

        } catch (error) {
            console.log(error)
            res.send(
                {
                    msg: "Internal Server Error",
                    status: 0
                }
            )
        }

    }
)

server.patch(
    "/user/status-change/:id",
    async (req, res) => {
        try {
            const id = req.params.id
            const user = await userModel.findById(id)

            if (user) {

                userModel.updateOne(
                    { _id: id },
                    {
                        status: !user.status
                    }
                ).then(
                    () => {
                        res.send(
                            {
                                msg: "User Updated Successfully",
                                status: 1
                            }
                        )
                    }
                ).catch(
                    () => {
                        res.send(
                            {
                                msg: "User Not Updated",
                                status: 0
                            }
                        )
                    }
                )

            } else {
                res.send(
                    {
                        msg: "User Not Found",
                        status: 0
                    }
                )
            }

        } catch (error) {
            console.log(error)
            res.send(
                {
                    msg: "Internal Server Error",
                    status: 0
                }
            )
        }

    }
)

server.put(
    "/user/update/:id",
    async (req, res) => {
        try {
            const id = req.params.id
            const user = await userModel.findById(id)

            if (user) {

                userModel.updateOne(
                    { _id: id },
                    {
                        ...req.body
                    }
                ).then(
                    () => {
                        res.send(
                            {
                                msg: "User Updated Successfully",
                                status: 1
                            }
                        )
                    }
                ).catch(
                    () => {
                        res.send(
                            {
                                msg: "User Not Updated",
                                status: 0
                            }
                        )
                    }
                )

            } else {
                res.send(
                    {
                        msg: "User Not Found",
                        status: 0
                    }
                )
            }

        } catch (error) {
            console.log(error)
            res.send(
                {
                    msg: "Internal Server Error",
                    status: 0
                }
            )
        }
    }
)



mongoose.connect(
    "mongodb://localhost:27017",
    {
        dbName: "WSJP52"
    }
).then(
    () => {
        server.listen(
            5000,
            () => {
                console.log('Server start Port number 5000')
            }
        )
    }
)
    .catch(
        () => {
            console.log('DB not connected')
        }
    )



