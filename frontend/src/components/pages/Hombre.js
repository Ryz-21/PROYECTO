import React, { useState } from "react";
import "./Hombre.css";
import { useWishlist } from "../../context/WishlistContext"; // ❤️ Para wishlist
import { useCart } from "../../context/CartContext";         // 🛒 Para carrito
import { useSearch } from "../../context/SearchContext";

const products = [
  { id: 10, name: "Camisa Imperial", image: require("../../image/Ropa/Hombre/camisa1.jpg"), price: 119.90 },
  { id: 11, name: "Camisa Atlante", image: require("../../image/Ropa/Hombre/camisa2.jpg"), price: 129.90 },
  { id: 12, name: "Pantalón Urbano", image: require("../../image/Ropa/Hombre/pantalon1.jpg"), price: 139.90 },
  { id: 13, name: "Pantalón Terra", image: require("../../image/Ropa/Hombre/pantalon2.jpg"), price: 149.90 },
  { id: 14, name: "Polera Aurora", image: require("../../image/Ropa/Hombre/polera1.jpg"), price: 89.90 },
  { id: 15, name: "Polera Ébano", image: require("../../image/Ropa/Hombre/polera2.jpg"), price: 89.90 },
  { id: 16, name: "Polera Eclipse", image: require("../../image/Ropa/Hombre/polera3.jpg"), price: 99.90 },
  { id: 17, name: "Polo Bruma", image: require("../../image/Ropa/Hombre/polo1.jpg"), price: 69.90 },
  { id: 18, name: "Polo Alisio", image: require("../../image/Ropa/Hombre/polo2.jpg"), price: 74.90 },
];

function Hombre() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { searchTerm } = useSearch();


  
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) // ✅ agregación del paso 4
  );

  const closeModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setSelectedSize("");
  };

  const handleQuantity = (type) => {
    if (type === "inc") setQuantity((q) => q + 1);
    else if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  }; //isInWishlist

  return (
    <section className="hombre-page">
      <h2>Ropa para Hombre</h2>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              onClick={() => setSelectedProduct(product)}
            />
            <h3>{product.name}</h3>
            <p className="price">S/. {product.price.toFixed(2)}</p>

            <button
              className="like-btn"
              onClick={() => toggleWishlist({ ...product, size: "M" })}            >
              {isInWishlist(product.id) ? "♡" : "♡"}
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✕</button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="modal-image"
            />
            <div className="modal-content">
              <div>
                <h3>{selectedProduct.name}</h3>
                <p className="price">S/. {selectedProduct.price.toFixed(2)}</p>

                <div className="sizes">
                  <label>Tallas:</label>
                  <div className="size-options">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className={selectedSize === size ? "active" : ""}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="quantity">
                  <label>Cantidad:</label>
                  <div className="qty-controls">
                    <button onClick={() => handleQuantity("dec")}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantity("inc")}>+</button>
                  </div>
                </div>
              </div>

              {/* Botón Agregar al Carrito con integración */}
              <button
                className="add-to-cart"
                onClick={() => {
                  addToCart({ ...selectedProduct, size: selectedSize }, quantity);
                  closeModal();
                }}
                disabled={!selectedSize}
              >
                Agregar al carrito
              </button>
              
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hombre;
