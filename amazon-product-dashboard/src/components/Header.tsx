import type { Category } from "../types/Product";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: Category | "All";
  setSelectedCategory: (value: Category | "All") => void;
  cartCount: number;
  onCartClick: () => void;
}

function Header({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  cartCount,
  onCartClick,
}: HeaderProps) {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        amazon<span>.in</span>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="search-button">
          🔍
        </button>
      </div>

      {/* Category and Cart */}
      <div className="header-actions">
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value as Category | "All"
            )
          }
        >
          <option value="All">All Products</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothes">Clothes</option>
          <option value="Shoes">Shoes</option>
        </select>

        <button
          className="cart-button"
          onClick={onCartClick}
        >
          🛒 Cart ({cartCount})
        </button>
      </div>
    </header>
  );
}

export default Header;