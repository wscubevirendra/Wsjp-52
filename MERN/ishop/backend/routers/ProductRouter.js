const express = require("express");
const ProductController = require('../controllers/ProductController')
const ProductRouter = express.Router();
const fileupload = require("express-fileupload")




ProductRouter.get("/:id?", (req, res) => {
    const result = new ProductController().read(req.params.id,req.query)
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


ProductRouter.post(
    "/create",
    fileupload(
        {
            createParentPath: true
        }
    )
    ,
    (req, res) => {
        const result = new ProductController().create(req.body, req.files?.main_image)
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


ProductRouter.patch("/status-update", (req, res) => {
    const result = new ProductController().statusUpdate(req.body.id, req.body.flag)
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



ProductRouter.post(
    "/multiple-images/:id",
    fileupload(
        {
            createParentPath: true
        }
    )
    ,
    (req, res) => {
     
        const result = new ProductController().multipleImages(req.params.id, req.files?.others_images)
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





module.exports = ProductRouter;