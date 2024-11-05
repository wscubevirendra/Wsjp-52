const express = require("express");
const CategoryController = require('../controllers/ColorController')
const CategoryRouter = express.Router();
const fileupload = require("express-fileupload")




CategoryRouter.post(
    "/create",
    fileupload(
        {
            createParentPath: true
        }
    )
    ,
    (req, res) => {

        const result = new CategoryController().create(req.body, req.files?.image_name)
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


CategoryRouter.get("/:id?", (req, res) => {
    const result = new CategoryController().read(req.params.id)
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


CategoryRouter.patch("/status-update/:id", (req, res) => {
    const result = new CategoryController().statusUpdate(req.params.id)
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

CategoryRouter.delete("/delete/:id", (req, res) => {
    const result = new CategoryController().delete(req.params.id)
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

CategoryRouter.put("/edit/:id"
    ,
    fileupload(
        {
            createParentPath: true
        }
    )
    ,
    (req, res) => {
        const result = new CategoryController().edit(req.params.id, req.body, req.files?.image_name ?? null)
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




module.exports = CategoryRouter;