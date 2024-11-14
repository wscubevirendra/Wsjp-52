const express = require("express");
const AdminController = require('../controllers/AdminController')
const AdminRouter = express.Router();



AdminRouter.post(
    "/register",
    (req, res) => {
        const result = new AdminController().register(req.body)
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


AdminRouter.post(
    "/login",
    (req, res) => {
        const result = new AdminController().AdminLogin(req.body)
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


module.exports = AdminRouter;