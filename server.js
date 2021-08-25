require("dotenv").config()
const express = require("express")
const paypal = require("@paypal/checkout-server-sdk")
const app = express()

const client = new paypal.core.paypalHttpClient(
  new env(process.env.CLIENT_KEY, process.env.CLIENT_ID),
)
const env =
  process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())

const items = new Map([
  [1, { price: 2000 }],
  [2, { price: 3000 }],
])

app.get("/", (req, res) => {
  res.render("index", {
    clientId: process.env.CLIENT_ID,
  })
})

app.post("/order", (req, res) => {
  const send = new paypal.orders.OrdersCreateRequest()
  const total = req.body.items.reduce((totalAmount, eachItem) => {
    return totalAmount + items.get(item.id).price * item.quantity
  }, 0)
  send.prefer("return=representation")
  send.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: total,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: total,
            },
          },
        },
        items: req.body.items.map((item) => {
          const storeItem = storeItems.get(item.is)
          return {
            name: storeItem.name,
            unit_amount: {
              currency_code: "USD",
              value: storeItem.price,
            },
            quantity: item.quantity,
          }
        }),
      },
    ],
  })
  try {
    const order = await client.execute(send)
    console.log(order)
  } catch (err) {
    res.status(404)
  }
})

app.listen(8000)
