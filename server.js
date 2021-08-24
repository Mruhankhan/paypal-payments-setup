require("dotenv").config()
const express = require("express")
const paypal = require('@paypal/checkout-server-sdk')
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())

const items = new Map([
  [1, { price: 2000 , name='shirt'}],
  [2, { price: 3000 , name='pants'}],
])


app.get("/", (req, res) => {
  res.render("index", {
    clientId: process.env.CLIENT_ID,
  })
})

app.post('/order', (req, res) =>{
  const send  = new paypal.orders.OrdersCreateRequest()
  const total = req.body.items.reduce((totalAmount , eachItem) =>{
    return totalAmount + items.get(item.id).price * item.quantity
  },0)
  send.prefer('return=representation')
  send.requestBody({
    'intent':"CAPTURE",
    "purchase_units":[
      {
        amount:{
          
        }
      }
    ]
  })
})

app.listen(8000)
