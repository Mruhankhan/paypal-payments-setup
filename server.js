require("dotenv").config()
const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.get("/", (req, res) => {
  res.render("index", {
    clientId: process.env.CLIENT_ID,
  })
})

app.listen(8000)