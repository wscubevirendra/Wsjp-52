const express = require("express");
const UserController = require('../controllers/UserController')
const UserRouter = express.Router();



UserRouter.post(
    "/register",
    (req, res) => {
        const result = new UserController().register(req.body)
        result.then(
            (success) => {
                res.send(success)
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
    (req, res) => {
        const result = new UserController().login(req.body)
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)

            }
        )
    }
)

UserRouter.post("/move-to-cart/:user_id",
    (req, res) => {
        const result = new UserController().moveTocart(req.params.user_id, req.body)
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)

            }
        )


    })


module.exports = UserRouter;