const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 200,
            unique: true
        },
        slug: {
            type: String,
            maxLength: 200,
            unique: true

        },
        short_description: {
            type: String,
        },
        long_description: {
            type: String,
        },
        original_price: {
            type: Number,
            default: 1
        },
        discount_percentage: {
            type: Number,
            default: 0
        },
        final_price: {
            type: Number,
            min: 1
        },
        category_id: {
            type: mongoose.Schema.ObjectId,
            ref: "Category"
        },
        colors: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Color"
            }
        ],
        main_image: {
            type: String,
            default: null
        },
        others_images: [
            {
                type: String,
            }
        ],
        stock: {
            type: Boolean,
            default: true
        },
        top_selling: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)

const ProductModel = mongoose.model("Products", productSchema);
module.exports = ProductModel