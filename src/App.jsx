import React, { useState } from "react";

export default function App() {
  const productsData = [
    { id: 1, name: "Laptop", price: 800 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Headphones", price: 150 },
    { id: 4, name: "Shoes", price: 120 },
  ];

  const [cart, setCart] = useState([]);
  const [viewCart, setViewCart] = useState(false);

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const changeQty = (id, type) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === "inc" ? item.qty + 1 : item.qty - 1,
            }
          : item
      ).filter(item => item.qty > 0)
    );
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 Mini E-commerce</h1>

      <button onClick={() => setViewCart(!viewCart)} style={styles.cartBtn}>
        {viewCart ? "← Back to Shop" : `Cart (${cart.length})`}
      </button>

      {!viewCart ? (
        <div style={styles.grid}>
          {productsData.map((product) => (
            <div key={product.id} style={styles.card}>
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button
                style={styles.button}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>

                  <div>
                    <button onClick={() => changeQty(item.id, "dec")}>
                      -
                    </button>
                    <span style={{ margin: "0 10px" }}>
                      {item.qty}
                    </span>
                    <button onClick={() => changeQty(item.id, "inc")}>
                      +
                    </button>
                  </div>

                  <button
                    style={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <h2>Total: ₹{total}</h2>
              <button style={styles.checkout}>Checkout</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
  },
  cartBtn: {
    marginBottom: 20,
    padding: 10,
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 20,
  },
  card: {
    border: "1px solid #ddd",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    padding: 8,
    cursor: "pointer",
  },
  cartItem: {
    borderBottom: "1px solid #ccc",
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  removeBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: 5,
    cursor: "pointer",
  },
  checkout: {
    marginTop: 20,
    padding: 10,
    background: "green",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};