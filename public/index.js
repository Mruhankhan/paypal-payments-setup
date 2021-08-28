paypal
  .Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: function () {
      return fetch("/order", {
        method: "POST",
        headers: {
          "Context-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: 1,
              quantity: 1000,
            },
            {
              id: 2,
              quantity: 2000,
            },
          ],
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            return res.json().then((json) => Promise.reject(json))
          }
        })
        .then(({ id }) => {
          return id
        })
        .catch((err) => {
          console.error(err)
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
