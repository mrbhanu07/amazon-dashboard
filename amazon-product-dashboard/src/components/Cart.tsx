import type { Product } from "../types/Product";

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

function Cart({
  cart,
  isOpen,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}: CartProps) {
  if (!isOpen) {
    return null;
  }

  // Calculate total price
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Background Overlay */}
      <div
        className="cart-overlay"
        onClick={onClose}
      ></div>

      {/* Cart Sidebar */}
      <aside className="cart-sidebar open">

        {/* Cart Header */}
        <div className="cart-header">
          <h2>Your Cart</h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              🛒
            </div>

            <h3>Your cart is empty</h3>

            <p>
              Add some products to your cart.
            </p>
          </div>
        ) : (
          <>
            {/* Cart Products */}
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">
                    <h4>{item.name}</h4>

                    <p>
                      ₹
                      {item.price.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    {/* Quantity Controls */}
                    <div className="quantity-controls">

                      <button
                        onClick={() =>
                          onDecrease(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          onIncrease(item.id)
                        }
                      >
                        +
                      </button>

                      <button
                        className="remove-button"
                        onClick={() =>
                          onRemove(item.id)
                        }
                      >
                        Remove
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="cart-footer">

              <div className="cart-total">
                <span>Total:</span>

                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              <button className="checkout-button">
                Proceed to Checkout
              </button>

            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default Cart;