paypal
  .Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "100",
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: "100",
                },
              },
            },
            items: [
              {
                name: "First Product Name",
                description: "Optional descriptive text...",
                unit_amount: {
                  currency_code: "USD",
                  value: "50",
                },
                quantity: "2",
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
