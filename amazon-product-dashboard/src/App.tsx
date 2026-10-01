import { useMemo, useState } from "react";

import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

import { products } from "./data/products";

import type {
  Category,
  Product,
} from "./types/Product";

import "./App.css";

interface CartItem extends Product {
  quantity: number;
}

function App() {

  // Search state
  const [searchTerm, setSearchTerm] =
    useState("");

  // Category state
  const [selectedCategory, setSelectedCategory] =
    useState<Category | "All">("All");

  // Cart state
  const [cart, setCart] =
    useState<CartItem[]>([]);

  // Cart visibility state
  const [isCartOpen, setIsCartOpen] =
    useState(false);


  // Filter products
  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      // Search condition
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      // Category condition
      const matchesCategory =
        selectedCategory === "All" ||
        product.category ===
          selectedCategory;

      // Both conditions must be true
      return (
        matchesSearch &&
        matchesCategory
      );
    });

  }, [searchTerm, selectedCategory]);


  // Add product to cart
  const addToCart = (
    product: Product
  ) => {

    setCart((previousCart) => {

      // Check whether product already exists
      const existingItem =
        previousCart.find(
          (item) =>
            item.id === product.id
        );

      // If product exists, increase quantity
      if (existingItem) {

        return previousCart.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        );
      }

      // If product does not exist,
      // add it to the cart
      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };


  // Increase quantity
  const increaseQuantity = (
    id: number
  ) => {

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };


  // Decrease quantity
  const decreaseQuantity = (
    id: number
  ) => {

    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )

        // Remove item if quantity becomes 0
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };


  // Remove product completely
  const removeFromCart = (
    id: number
  ) => {

    setCart((previousCart) =>
      previousCart.filter(
        (item) =>
          item.id !== id
      )
    );
  };


  // Calculate number of products
  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  return (
    <div className="app">

      {/* Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={
          selectedCategory
        }
        setSelectedCategory={
          setSelectedCategory
        }
        cartCount={cartCount}
        onCartClick={() =>
          setIsCartOpen(true)
        }
      />


      {/* Main Content */}
      <main className="main-content">

        {/* Hero Section */}
        <section className="hero">

          <h1>
            Product Dashboard
          </h1>

          <p>
            Explore Electronics,
            Clothes and Shoes
          </p>

        </section>


        {/* Products Section */}
        <section className="products-section">

          <div className="section-header">

            <div>

              <h2>
                {selectedCategory ===
                "All"
                  ? "All Products"
                  : selectedCategory}
              </h2>

              <p>
                {
                  filteredProducts.length
                }{" "}
                products found
              </p>

            </div>

          </div>


          {/* No Products */}
          {filteredProducts.length ===
          0 ? (

            <div className="no-products">

              <h2>
                No products found
              </h2>

              <p>
                Try another search.
              </p>

            </div>

          ) : (

            /* Product Cards */
            <div className="products-grid">

              {filteredProducts.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={
                      addToCart
                    }
                  />

                )
              )}

            </div>
          )}

        </section>

      </main>


      {/* Footer */}
      <footer className="footer">

        <p>
          Product Dashboard -
          React + TypeScript
        </p>

      </footer>


      {/* Cart */}
      <Cart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() =>
          setIsCartOpen(false)
        }
        onIncrease={
          increaseQuantity
        }
        onDecrease={
          decreaseQuantity
        }
        onRemove={
          removeFromCart
        }
      />

    </div>
  );
}

export default App;