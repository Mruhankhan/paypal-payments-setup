paypal
  .Buttons({
    style: {
      shape: "pill",
      color: "blue",
      layout: "vertical",
      label: "paypal",
    },
    onError: function (err) {
      console.log(err)
    },
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "8150",
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: "8150",
                },
              },
            },
            items: [
              {
                name: "Laptop",
                description: "Hp Laptop",
                unit_amount: {
                  currency_code: "USD",
                  value: "1200",
                },
                quantity: "1",
              },
              {
                name: "I Phone",
                description: "I Phone 12",
                unit_amount: {
                  currency_code: "USD",
                  value: "1300",
                },
                quantity: "4",
              },
              {
                name: "I mac",
                description: "late 2009 imac",
                unit_amount: {
                  currency_code: "USD",
                  value: "250",
                },
                quantity: "2",
              },
              {
                name: "Laptops Imac Phone Screen Covers",
                description: "late 2009 imac",
                unit_amount: {
                  currency_code: "USD",
                  value: "250",
                },
                quantity: "5",
              },
            ],
          },
        ],
      })
    },
  onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {
        console.log("Capture result", orderData, JSON.stringify(orderData, null, 2))
        var transaction = orderData.purchase_units[0].payments.captures[0]
        alert("Transaction " + transaction.status + ": " + transaction.id + "\n\nSee console for all available details")
      })
    },
  })
  .render("#paypal-button")

