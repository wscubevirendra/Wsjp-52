require('dotenv').config()
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);
const generatedcategoryImageName = (image) => {
    return Math.floor(Math.random() * 10000) + new Date().getTime() + image;
};

const encryptedPassword = (value) => {
    return cryptr.encrypt(value)
}

const decryptedPassword = (value) => {
    return cryptr.decrypt(value)

}


module.exports = { generatedcategoryImageName, encryptedPassword, decryptedPassword };
