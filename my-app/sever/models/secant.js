const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    id: Number,
    XOLD: String,
    XNEW: String,
    Function: String
})

const ProductModel = mongoose.model('secant', productSchema)

module.exports = ProductModel