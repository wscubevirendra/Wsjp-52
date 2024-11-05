const mongoose = require('mongoose');


const UserData = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 100,
        },
        email: {
            type: String,
            maxLength: 50,
            unique: true
        },
        contact: {
            type: String,
        },
        password: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true //true ---active inactive
        }
    }, {
    timestamps: true
}
)

const userModel = mongoose.model("User", UserData)

module.exports = userModel