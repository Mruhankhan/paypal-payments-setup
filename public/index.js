paypal
  .Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: 10,
            },
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
