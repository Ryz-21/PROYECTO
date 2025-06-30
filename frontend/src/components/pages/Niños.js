import React, {useState} from "react";
import "./Niños.css";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";


const products = [
  {id:19 , name:"Camisa N1B" , image:require("../../image/Ropa/Niños/camisa1.jpg"), price: 119.90},
  {id:20, name:"Polo V1S" , image:require("../../image/Ropa/Niños/camisa2.webp"), price: 129.90},
  {id:21, name:"Polo V2S" , image:require("../../image/Ropa/Niños/camisa3.webp"), price: 139.90},
  {id:22, name:"Pantalon RS2" , image:require("../../image/Ropa/Niños/pantalon1.jpg"), price: 149.90},
  {id:23, name:"Pamtalon NRB" , image:require("../../image/Ropa/Niños/pantalon2.webp"), price: 89.90},
  {id:24, name:"Pantalon W2E" , image:require("../../image/Ropa/Niños/pantalon3.webp"), price: 89.90},
  {id:25, name:"Carpa R1" , image:require("../../image/Ropa/Niños/polera1.webp"), price: 99.90},
  {id:26, name:"Carpa BBG" , image:require("../../image/Ropa/Niños/polera2.jpg"), price: 69.90},
  {id:27, name:"Carpa MM2" , image:require("../../image/Ropa/Niños/polera3.jpg"), price: 74.90},
]

function Niños() {
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
    <section className="niños-page">
      <h2>Ropa para Niños</h2>
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
                onClick={() => toggleWishlist({ ...product, size: "M" })}
            >
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

export default Niños;