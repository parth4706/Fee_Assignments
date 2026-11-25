import { useEffect, useMemo, useState } from 'react'

const API = 'https://dummyjson.com'

export default function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')
  const [cart, setCart] = useState([])
  const [selected, setSelected] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      fetch(`${API}/products?limit=0`).then((response) => response.json()),
      fetch(`${API}/products/categories`).then((response) => response.json()),
    ])
      .then(([productData, categoryData]) => {
        setProducts(productData.products)
        setCategories(categoryData)
      })
      .catch(() => setError('Could not load products. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      const matchesCategory = category === 'all' || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [products, search, category, sort])

  function changeSort(value) {
    setSort(value)
    setLoading(true)

    const url =
      value === 'title'
        ? `${API}/products?sortBy=title&order=asc`
        : `${API}/products?limit=0`

    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch(() => setError('Could not sort products. Please try again.'))
      .finally(() => setLoading(false))
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  function categoryName(value) {
    if (typeof value === 'string') {
      return value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
    }
    return value.name
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  return (
    <div className="shopsmart-app">
      <header className="shop-header">
        <button
          className="brand"
          type="button"
          onClick={() => {
            setSearch('')
            setCategory('all')
            setSort('featured')
          }}
        >
          <span>ShopSmart</span>
        </button>
        <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />
        </form>
        <button className="cart-button" type="button" onClick={() => setCartOpen(true)}>
          <span aria-hidden="true"></span>
          <span>Cart</span>
          <b>{cartCount}</b>
        </button>
      </header>

      <main className="shop-main">
        <section className="catalog-heading">
          <div>
            
            <h1>{category === 'all' ? 'All Products' : categoryName(category)}</h1>
          </div>
          <p className="product-count">{visibleProducts.length} products</p>
        </section>
        <div className="catalog-controls">
          <label className="category-filter">
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All categories</option>
              {categories.map((item) => {
                const value = typeof item === 'string' ? item : item.slug
                return (
                  <option key={value} value={value}>
                    {categoryName(item)}
                  </option>
                )
              })}
            </select>
          </label>
          <label className="sort-filter">
            <span>Sort by</span>
            <select value={sort} onChange={(event) => changeSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="title">Name: A-Z</option>
            </select>
          </label>
        </div>
        {loading && <p className="status-message">Loading products...</p>}
        {error && <p className="status-message error">{error}</p>}
        {!loading && !error && (
          <section className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <button className="product-image" type="button" onClick={() => setSelected(product)}>
                  <img src={product.thumbnail} alt={product.title} />
                </button>
                <div className="product-card-content">
                  
                  <button className="product-title" type="button" onClick={() => setSelected(product)}>
                    {product.title}
                  </button>
                  <div className="rating"><span>rating:</span> {product.rating}</div>
                  <div className="product-card-footer">
                    <strong>${product.price.toFixed(2)}</strong>
                    <button type="button" onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {!loading && !visibleProducts.length && (
          <p className="status-message">No products match your search.</p>
        )}
      </main>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <section className="product-details" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <div className="details-image">
              <img src={selected.thumbnail} alt={selected.title} />
            </div>
            <div className="details-content">
              <p className="product-category">{categoryName(selected.category)}</p>
              <h2>{selected.title}</h2>
              <div className="details-rating"><span>★</span> {selected.rating} <small>rating</small></div>
              <p className="details-description">{selected.description}</p>
              <div className="details-meta">
                <span><small>Brand</small>{selected.brand || 'Generic'}</span>
                <span><small>Stock</small>{selected.stock} available</span>
              </div>
              <div className="details-footer">
                <strong>${selected.price.toFixed(2)}</strong>
                <button type="button" onClick={() => addToCart(selected)}>Add to Cart</button>
              </div>
            </div>
          </section>
        </div>
      )}

      {cartOpen && (
        <div className="drawer-backdrop" role="presentation" onMouseDown={() => setCartOpen(false)}>
          <aside className="cart" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
            <div className="cart-header">
              <div>
                <p className="eyebrow">Your selection</p>
                <h2>Shopping Cart</h2>
              </div>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
              ) : cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <strong>${item.price.toFixed(2)}</strong>
                    <div className="quantity">
                      <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.title}`}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.title}`}>+</button>
                    </div>
                  </div>
                  <b>${(item.price * item.quantity).toFixed(2)}</b>
                </article>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="cart-total">
                <div><span>Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></div>
                <button type="button">Checkout</button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}
