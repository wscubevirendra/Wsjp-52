const ColorModel = require("../models/ColorModel")


class ColorController {
    create(data) {
        return new Promise(
            (resolve, reject) => {
                try {

                    if (!data.name || !data.colorCode) {
                        return reject(
                            {
                                msg: 'All Filed Required',
                                status: 0
                            }
                        )

                    }

                    const color = new ColorModel(
                        {
                            ...data

                        }
                    )
                    color.save()
                        .then(
                            () => {
                                resolve(
                                    {
                                        msg: "color Create",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                reject(
                                    {
                                        msg: "Unable to create color",
                                        status: 1
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

    read(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    let color = null;
                    if (id == null) {
                        color = await ColorModel.find()
                    } else {
                        color = await ColorModel.findById(id)
                    }

                    resolve(
                        {
                            msg: "Color Find",
                            status: 1,
                            color
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
                    const color = await ColorModel.findById(id);

                    if (color) {
                        ColorModel.updateOne(
                            { _id: id },
                            {
                                $set: {
                                    status: !color.status
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
                                msg: "Color Not find",
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
                    ColorModel.deleteOne(
                        {
                            _id: id
                        }
                    ).then(
                        () => {
                            resolve(
                                {
                                    msg: "Color deleted",
                                    status: 1
                                }
                            )

                        }

                    ).catch(
                        () => {
                            reject(
                                {
                                    msg: "Unable to delete color code",
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

    edit(id, data) {
        return new Promise(
            async (resolve, reject) => {
                const color = await ColorModel.findById(id);
                try {
                    ColorModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            $set: {
                                name: data.name,
                                colorCode: data.colorCode
                            }
                        }
                    ).then(
                        () => {
                            resolve(
                                {
                                    msg: "Color Updated",
                                    status: 1
                                }
                            )
                        }

                    ).catch(
                        () => {
                            reject(
                                {
                                    msg: "Unable to Update Color ",
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


}

module.exports = ColorController