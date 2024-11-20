require('dotenv').config()
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);
const generatedcategoryImageName = (image) => {
    return Math.floor(Math.random() * 10000) + new Date().getTime() + image;
};

const adminToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY);
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}

const encryptedPassword = (value) => {
    return cryptr.encrypt(value)
}

const decryptedPassword = (value) => {
    return cryptr.decrypt(value)
}


module.exports = { adminToken, verifyToken, generatedcategoryImageName, encryptedPassword, decryptedPassword };
