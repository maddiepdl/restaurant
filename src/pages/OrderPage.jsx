// form to submit orders to my SupaBase
import React, { useState } from "react";

function OrderPage() {
  // inputs for customer_name & order_details
  const [name, setName] = useState("");
  const [orderText, setOrderText] = useState("");
  const [message, setMessage] = useState("");

  // handleSubmit saves order to my Supabase table
  const handleSubmit = async (e) => {
    e.preventDefault();

    const base = import.meta.env.VITE_SUPABASE_URL;   
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // REST endpoint for my Supabase table
    const url = base + "/orders";

    const order = {
      customer_name: name,
      order_details: orderText
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify(order)
    });

    if (response.ok) {
      setMessage("Order submitted successfully!");
      setName("");
      setOrderText("");
    } else {
      setMessage("Error submitting order");
    }
  };

  return (
    <div>
      <h1>Place Your Order</h1>

      {/* form with the required fields */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name:</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Order Details:</label>
          <br />
          <textarea
            value={orderText}
            onChange={(e) => setOrderText(e.target.value)}
            required
            rows={4}
            cols={40}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="submit">Submit Order</button>
        </div>
      </form>

      {/* success message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderPage;
