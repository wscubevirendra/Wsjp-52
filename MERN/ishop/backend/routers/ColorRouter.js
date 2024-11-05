const express = require("express");
const ColorController = require('../controllers/ColorController')
const ColorRouter = express.Router();



ColorRouter.post(
    "/create",
    (req, res) => {

        const result = new ColorController().create(req.body)
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


ColorRouter.get("/:id?", (req, res) => {
    const result = new ColorController().read(req.params.id)
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


ColorRouter.patch("/status-update/:id", (req, res) => {
    const result = new ColorController().statusUpdate(req.params.id)
    result.then(
        (success) => {
            res.send(success)
        }
    ).catch(

        (error) => {
            console.log(error)

            res.send(error)

        }
    )
}
)

ColorRouter.delete("/delete/:id", (req, res) => {
    const result = new ColorController().delete(req.params.id)
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

ColorRouter.put("/edit/:id",
    (req, res) => {
        const result = new ColorController().edit(req.params.id, req.body)
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




module.exports = ColorRouter;