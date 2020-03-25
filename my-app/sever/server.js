const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product')
const onepoint = require('./models/onepoint')
const secant = require('./models/secant')
const Newton = require('./models/Newton')
app.use(express.json())
mongoose.connect
('mongodb+srv://6004062630469:028656435@cluster0-epnrw.mongodb.net/numerical?retryWrites=true&w=majority', 
{ useNewUrlParser: true })


app.post('/products', async (req, res) => {
  const payload = req.body
  const product = new Product(payload)
  await product.save()
  res.status(201).end()
})

app.listen(9000, () => {
  console.log('Application is running on port 9000')
})

app.get('/bisection', async (req, res) => {
  const products = await Product.findOne({ id: Math.floor(Math.random() * 2 + 1) })
  res.json(products)
});

app.get('/Falseposition', async (req, res) => {
  const products = await Product.findOne({ id: Math.floor(Math.random() * 2 + 1) })
  res.json(products)
});

app.get('/onepoint', async (req, res) => {
  const products = await onepoint.findOne({ id: Math.floor(Math.random() * 2 + 1) })
  res.json(products)
});

app.get('/Newton', async (req, res) => {
  const products = await Newton.findOne({ id: Math.floor(Math.random() * 2 + 1) })
  res.json(products)
});

app.get('/secant', async (req, res) => {
  const products = await secant.findOne({ id: Math.floor(Math.random() * 2 + 1) })
  res.json(products)
});

app.post("/secant", async (req, res) => {
  const payload = req.body;
  const product = new secant(payload);
  await product.save();
  res.status(201).end();
});