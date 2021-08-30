paypal
  .Buttons({
    // Sets up the transaction when a payment button is clicked
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
    // Finalize the transaction after payer approval
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {
        // Successful capture! For dev/demo purposes:
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2),
        )
        var transaction = orderData.purchase_units[0].payments.captures[0]
        alert(
          "Transaction " +
            transaction.status +
            ": " +
            transaction.id +
            "\n\nSee console for all available details",
        )
      })
    },
  })
  .render("#paypal-button")
console.log(1200 + 1300 * 4 + 250 * 2 + 250 * 5)
