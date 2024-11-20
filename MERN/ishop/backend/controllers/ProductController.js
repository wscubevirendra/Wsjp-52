const ProductModel = require("../models/ProductModel")
const CategoryModel = require("../models/CategoryModel")
const { generatedcategoryImageName } = require('../helping');
const { json } = require("express");



class ProductController {
    read(id, query) {
        return new Promise(
            async (resolve, reject) => {
                console.log(query)
                try {
                    const filterQuery = {};
                    if (query.category_slug != "null") {
                        const category = await CategoryModel.findOne({
                            slug: query.category_slug
                        })
                        filterQuery["category_id"]=category._id

                    }
                    
                    if(query.product_color != "null"){
                        filterQuery["colors"]=query.product_color
                    }
                

                    let Product = null;
                    if (id == null) {
                        Product = await ProductModel.find(filterQuery).populate(["category_id", "colors"]).limit(query.limit)
                    } else {
                        Product = await ProductModel.findById(id)
                    }

                    resolve(
                        {
                            msg: "Product Find",
                            status: 1,
                            Product
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


    create(data, product_image) {
        return new Promise(
            (resolve, reject) => {
                try {

                    if (!data.name || !data.slug || !product_image) {
                        return reject(
                            {
                                msg: 'All Filed Required',
                                status: 0
                            }
                        )

                    }
                    const product_img = generatedcategoryImageName(product_image.name)
                    const destination = './public/images/product/' + product_img
                    product_image.mv(
                        destination,
                        (err) => {
                            if (err) {
                                reject(
                                    {
                                        msg: "Unable to Upload a file",
                                        status: 0
                                    }
                                )

                            } else {

                                const product = new ProductModel(
                                    {
                                        ...data,
                                        colors: JSON.parse(data.colors),
                                        main_image: product_img

                                    }
                                )
                                product.save()
                                    .then(
                                        () => {
                                            resolve(
                                                {
                                                    msg: "Product Add",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        () => {
                                            reject(
                                                {
                                                    msg: "Unable to Add Product",
                                                    status: 1
                                                }
                                            )
                                        }
                                    )

                            }

                        }
                    )

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


    statusUpdate(id, flag) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const productstatus = {}
                    const product = await ProductModel.findById(id);
                    if (flag == 1) {
                        productstatus.status = !product.status
                    } else if (flag == 2) {
                        productstatus.stock = !product.stock
                    } else if (flag == 3) {
                        productstatus.top_selling = !product.top_selling

                    }

                    if (product) {
                        ProductModel.updateOne(
                            { _id: id },
                            {
                                $set: productstatus
                            }
                        ).then(
                            () => {
                                resolve(
                                    {
                                        msg: "Status Updated",
                                        status: 1
                                    }
                                )
                            }

                        ).catch(
                            () => {
                                reject(
                                    {
                                        msg: "Unable to Update Status ",
                                        status: 0
                                    }
                                )
                            }

                        )

                    } else {
                        reject(
                            {
                                msg: "Category Not find",
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

    multipleImages(id, allImage) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const product = await ProductModel.findById(id);
                    const allImages = Array.isArray(allImage) ? allImage : [allImage]
                    if (product) {
                        let currentImages = product.others_images ?? []
                        let allPromise = []
                        for (let image of allImages) {
                            let img = generatedcategoryImageName(image.name)
                            const destination = './public/images/product/' + img
                            currentImages.push(img)
                            allPromise.push(image.mv(destination))
                        }
                        Promise.all(allImages)
                        ProductModel.updateOne(
                            { _id: id },
                            {
                                $set: {
                                    others_images: currentImages
                                }
                            }
                        ).then(
                            () => {
                                resolve(
                                    {
                                        msg: "images updated",
                                        status: 1
                                    }
                                )
                            }

                        ).catch(
                            () => {
                                reject(
                                    {
                                        msg: "Unable to Update images ",
                                        status: 0
                                    }
                                )
                            }

                        )




                    } else {
                        reject(
                            {
                                msg: "Product not found",
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

module.exports = ProductController