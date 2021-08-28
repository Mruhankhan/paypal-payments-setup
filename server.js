require("dotenv").config()
const express = require("express")
const paypal = require("@paypal/checkout-server-sdk")
const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())

const env =
  process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment

const client = new paypal.core.PayPalHttpClient(
  new env(process.env.CLIENT_KEY, process.env.CLIENT_ID),
)

const items = new Map([
  [1, { price: 2000 }],
  [2, { price: 3000 }],
])

app.get("/", (req, res) => {
  res.render("index", {
    clientId: process.env.CLIENT_ID,
  })
})

app.post("/order", async (req, res) => {
  const send = new paypal.orders.OrdersCreateRequest()
  const total = req.body.items.reduce((totalAmount, eachItem) => {
    return totalAmount + items.get(eachItem.id).price * eachItem.quantity
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
        items: req.body.items.map((eachItem) => {
          const storeItem = storeItems.get(eachItem.id)
          return {
            name: storeItem.name,
            unit_amount: {
              currency_code: "USD",
              value: storeItem.price,
            },
            quantity: eachItem.quantity,
          }
        }),
      },
    ],
  })
  try {
    const order = await client.execute(send)
    res.json({ id: order.result.id })
  } catch (err) {
    res.status(404).json({ err: err.message })
  }
})

app.listen(3090)
