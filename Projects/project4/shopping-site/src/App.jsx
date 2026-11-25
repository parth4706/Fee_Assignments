import { useMemo, useState } from 'react'
import './App.css'
const products = [  
  {
    id: 1,
    name: 'Classic Hoodie',
    category: 'Apparel',
    price: 59,
    rating: 4.8,
    description: 'Soft cotton blend with a relaxed fit for everyday comfort.',
    accent: 'linear-gradient(135deg, #86efac, #22c55e)',
  },
  {
    id: 2,

    name: 'Urban Runner',
    category: 'Footwear',
    price: 89,
    rating: 4.7,
    description: 'Lightweight sneakers built for movement and all-day wear.',
    accent: 'linear-gradient(135deg, #86efac, #22c55e)',
  },
  {
    id: 3,
    name: 'SoundBeam Mini',
    category: 'Electronics',
    price: 74,
    rating: 4.9,
    description: 'Compact wireless speaker with rich bass and crystal-clear sound.',
    accent: 'linear-gradient(135deg, #86efac, #22c55e)',
  },
  {
    id: 4,
    name: 'Daypack Pro',
    category: 'Accessories',
    price: 96,
    rating: 4.6,
    description: 'Durable backpack with smart compartments for travel and work.',
    accent: 'linear-gradient(135deg, #86efac, #22c55e)',
  },
  {
    id: 5,
    name: 'Pulse Watch',
    category: 'Wearables',
    price: 129,
    rating: 4.8,
    description: 'Modern smartwatch with fitness tracking and premium styling.',
    accent: 'linear-gradient(135deg, #86efac, #22c55e)',
  },
  {
    id: 6,
    name: 'Glow Lamp',
    category: 'Home',
    price: 42,
    rating: 4.5,
    description: 'Minimal desk lamp that creates a calm and cozy atmosphere.',
    accent: 'linear-gradient(135deg, #86efac, #22c55e)',
  },
  {
    id: 7,
    name: 'Everyday Tee',
    category: 'Apparel',
    price: 28,
    rating: 4.7,
    description: 'Premium cotton tee designed for easy layering and comfort.',
    accent: 'linear-gradient(135deg, #86efac, #22c55e)',
  },
]
function App() {
  const [cart, setCart] = useState([])
  const addToCart = (product) => {
    setCart((currentCart) => {
      const itemExists = currentCart.find((item) => item.id === product.id)
      if (itemExists) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...currentCart, { ...product, quantity: 1 }]
    })
  }
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  )
  return (
    <div className="storefront">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">S</div>
          <div>
            <p className="brand-name">ShopSphere</p>
          </div>
        </div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">New Arrivals</a>
          <a href="#">Deals</a>
          <a href="#">Collections</a>
        </nav>
        <button type="button" className="cart-button">
          Cart ({totalItems})
        </button>
      </header>
      <main className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Fresh picks for the new season</span>
            <h1>Style your everyday with standout essentials.</h1>
            <p>
              Discover premium essentials for your home, wardrobe, and daily routine.
              Smart picks, clean design, and everyday comfort in one place.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary-btn">
                Shop now
              </button>
              <button type="button" className="secondary-btn">
                Explore deals
              </button>
            </div>
            <div className="hero-stats">
              <div>
                <strong>12k+</strong>
                <span>Happy shoppers</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Customer rating</span>
              </div>
              <div>
                <strong>48h</strong>
                <span>Fast delivery</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="spotlight-card">
              <span className="badge">Bestseller</span>
              <div className="spotlight-image" style={{ background: products[4].accent }} />
              <div className="spotlight-info">
                <p>Pulse Watch</p>
                <strong>$129</strong>
              </div>
            </div>
          </div>
        </section>
        <section className="categories">
          <span>Popular</span>
          <div className="category-tags">
            <button type="button">Apparel</button>
            <button type="button">Accessories</button>
            <button type="button">Home</button>
            <button type="button">Tech</button>
          </div>
        </section>
        <section className="catalog-layout">
          <div className="products-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div
                  className="product-image"
                  style={{ background: product.accent }}
                  aria-label={product.name}
                >
                  <span>{product.category}</span>
                </div>
                <div className="product-body">
                  <div className="product-header">
                    <div>
                      <h2>{product.name}</h2>
                      <p>{product.category}</p>
                    </div>
                    <strong>${product.price}</strong>
                  </div>
                  <div className="rating-row">
                    <span>★ {product.rating}</span>
                  </div>
                  <p className="product-description">{product.description}</p>  
                  <button type="button" onClick={() => addToCart(product)}>
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
          <aside className="cart-panel">
            <div className="cart-header">
              <h3>Your cart</h3>
              <span>{totalItems} items</span>
            </div>
            {cart.length > 0 ? (
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div
                      className="mini-color"
                      style={{ background: item.accent }}
                    ></div>
                    <div className="cart-item-info">
                      <strong>{item.name}</strong>
                      <span>
                        {item.quantity} × ${item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-cart">Your cart is empty.</p>
            )}
            <div className="totals">
              <div>
                <span>Subtotal</span>
                <strong>${subtotal}</strong>
              </div>
              <div>
                <span>Shipping</span>
                <strong>Free</strong>
              </div>
            </div>
            <button type="button" className="checkout-btn">
              Proceed to checkout
            </button>
          </aside>
        </section>
      </main>
    </div>
  )
}
export default App
