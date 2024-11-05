const express = require('express');
const userModel = require('../models/userModel')
const userController = require('../controllers/userController')
const UserRouter = express.Router();



UserRouter.post(
    "/register",
    (req, res) => {
        const result = new userController().userCreate(req.body);
        result.then(
            (succes) => {
                res.send(succes)
            }
        ).catch(
            (error) => {
                res.send(error)

            }
        )

    }
)

UserRouter.post(
    "/login",
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

UserRouter.get(
    "/:id?",
    async (req, res) => {
        const result = new userController().userGet(req.params.id)
        result.then(
            (succes) => {
                res.send(succes)
            }
        ).catch(
            (error) => {
                res.send(error)

            }
        )
        

    }
)

UserRouter.delete(
    "/delete/:id",
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

UserRouter.patch(
    "/status-change/:id",
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

UserRouter.put(
    "/update/:id",
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

module.exports = UserRouter;