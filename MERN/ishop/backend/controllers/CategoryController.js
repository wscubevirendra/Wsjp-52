const CategoryModel = require("../models/CategoryModel")
const { generatedcategoryImageName } = require('../helping')
const { unlinkSync } = require('fs')


class CategoryController {
    create(data, category_image) {
        return new Promise(
            (resolve, reject) => {
                try {

                    if (!data.name || !data.slug || !category_image) {
                        return reject(
                            {
                                msg: 'All Filed Required',
                                status: 0
                            }
                        )

                    }
                    const category_img = generatedcategoryImageName(category_image.name)
                    const destination = './public/images/category/' + category_img
                    category_image.mv(
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

                                const category = new CategoryModel(
                                    {
                                        ...data,
                                        image_name: category_img

                                    }
                                )
                                category.save()
                                    .then(
                                        () => {
                                            resolve(
                                                {
                                                    msg: "Category Create",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        () => {
                                            reject(
                                                {
                                                    msg: "Unable to create category",
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

    read(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    let category = null;
                    if (id == null) {
                        category = await CategoryModel.find()
                    } else {
                        category = await CategoryModel.findById(id)
                    }

                    resolve(
                        {
                            msg: "Category Find",
                            status: 1,
                            category
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

    statusUpdate(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const category = await CategoryModel.findById(id);

                    if (category) {
                        CategoryModel.updateOne(
                            { _id: id },
                            {
                                $set: {
                                    status: !category.status
                                }
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

    delete(id) {
        return new Promise(
            (resolve, reject) => {
                try {
                    CategoryModel.deleteOne(
                        {
                            _id: id
                        }
                    ).then(
                        () => {
                            resolve(
                                {
                                    msg: "Category deleted",
                                    status: 1
                                }
                            )

                        }

                    ).catch(
                        () => {
                            reject(
                                {
                                    msg: "Unable to delete category",
                                    status: 0
                                }

                            )

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

    edit(id, data, file) {
        return new Promise(
            async (resolve, reject) => {
                const category = await CategoryModel.findById(id);
                try {
                    if (file != null) {
                        const img_name = generatedcategoryImageName(file.name);
                        const destination = "./public/images/category/" + img_name
                        file.mv(
                            destination,
                            (err) => {
                                if (err) {
                                    reject(
                                        {
                                            msg: "Unable to Update a file",
                                            status: 0
                                        }
                                    )

                                } else {
                                    unlinkSync("./public/images/category/" + category.image_name)
                                    CategoryModel.updateOne(
                                        {
                                            _id: id
                                        },
                                        {
                                            $set: {
                                                name: data.name,
                                                slug: data.slug,
                                                image_name: img_name
                                            }
                                        }
                                    ).then(
                                        () => {
                                            resolve(
                                                {
                                                    msg: "Category Updated",
                                                    status: 1
                                                }
                                            )
                                        }

                                    ).catch(
                                        () => {
                                            reject(
                                                {
                                                    msg: "Unable to Update Category ",
                                                    status: 0
                                                }
                                            )
                                        }

                                    )

                                }
                            }

                        )


                    } else {
                        CategoryModel.updateOne(
                            {
                                _id: id
                            },
                            {
                                $set: {
                                    name: data.name,
                                    slug: data.slug
                                }
                            }
                        ).then(
                            () => {
                                resolve(
                                    {
                                        msg: "Category Updated",
                                        status: 1
                                    }
                                )
                            }

                        ).catch(
                            () => {
                                reject(
                                    {
                                        msg: "Unable to Update Category ",
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


}

module.exports = CategoryController