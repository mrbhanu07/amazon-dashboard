import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      {/* Product Details */}
      <div className="product-info">
        <span className="category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <div className="rating">
          ⭐ {product.rating}
        </div>

        <div className="price">
          ₹{product.price.toLocaleString("en-IN")}
        </div>

        <button
          className="add-cart-button"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;