import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  NavLink,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import { addToCart, clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from './store/cartSlice'
import { products } from './data/products'
import './App.css'

const money = (value) => `$${value.toFixed(2)}`

function Header() {
  const itemCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0))

  return (
    <header className="site-header">
      <NavLink className="brand" to="/">
        <span className="brand-mark">N</span>
        <span>Northstar</span>
      </NavLink>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/">Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/products">Shop</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/about">About</NavLink>
      </nav>
      <NavLink className="cart-link" to="/cart">
        <span aria-hidden="true">Bag</span>
        <span className="cart-count">{itemCount}</span>
      </NavLink>
    </header>
  )
}

function Home() {
  const navigate = useNavigate()
  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Curated for everyday living</p>
          <h1>Small details.<br /><em>Big feeling.</em></h1>
          <p className="hero-description">Thoughtful objects for your home, your rhythm, and the moments in between.</p>
          <button className="button button-dark" onClick={() => navigate('/products')}>Explore the collection <span>→</span></button>
        </div>
        <div className="hero-art" role="img" aria-label="A sunny, calm living room">
          <div className="sun"></div>
          <div className="arch"></div>
          <div className="plant plant-one"></div>
          <div className="plant plant-two"></div>
          <div className="chair"></div>
          <div className="table"></div>
          <div className="vase"></div>
        </div>
      </section>
      <section className="feature-strip">
        <div><strong>01</strong><span>Made to last</span></div>
        <div><strong>02</strong><span>Thoughtfully sourced</span></div>
        <div><strong>03</strong><span>Simple, joyful design</span></div>
      </section>
    </main>
  )
}

function Products() {
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [notice, setNotice] = useState('')
  const categories = ['All', ...new Set(products.map((product) => product.category))]
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (category === 'All' || product.category === category)
  }), [category, query])

  const handleAdd = (product) => {
    dispatch(addToCart(product))
    setNotice(`${product.name} added to your bag`)
    window.setTimeout(() => setNotice(''), 2600)
  }

  return (
    <main className="page-content">
      <div className="page-heading">
        <div><p className="eyebrow">The collection</p><h1>Objects with <em>intention.</em></h1></div>
        <p>Everyday essentials, elevated.</p>
      </div>
      {notice && <div className="toast" role="status">{notice}<span>✓</span></div>}
      <div className="product-controls">
        <label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products..." aria-label="Search products" /></label>
        <div className="category-list" aria-label="Filter by category">
          {categories.map((item) => <button className={category === item ? 'category active' : 'category'} key={item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}><span>{product.category}</span></div>
            <div className="product-details"><div><h2>{product.name}</h2><p>{product.description}</p></div><strong>{money(product.price)}</strong></div>
            <button className="add-button" onClick={() => handleAdd(product)}>Add to bag <span>+</span></button>
          </article>
        ))}
      </div>
      {filteredProducts.length === 0 && <p className="empty-search">No pieces match your search. Try another word.</p>}
    </main>
  )
}

function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector((state) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="page-content cart-page">
      <div className="page-heading"><div><p className="eyebrow">Your selection</p><h1>Your <em>bag.</em></h1></div><p>{items.length} {items.length === 1 ? 'piece' : 'pieces'}</p></div>
      {items.length === 0 ? (
        <div className="empty-cart"><div className="empty-icon">✦</div><h2>Your bag is waiting.</h2><p>Find something beautiful to bring home.</p><button className="button button-dark" onClick={() => navigate('/products')}>Browse the collection <span>→</span></button></div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">{items.map((item) => <article className="cart-item" key={item.id}>
            <div className="cart-item-image" style={{ backgroundImage: `url(${item.image})` }}></div>
            <div className="cart-item-info"><p className="eyebrow">{item.category}</p><h2>{item.name}</h2><p>{money(item.price)}</p><div className="quantity"><button aria-label={`Decrease ${item.name}`} onClick={() => dispatch(decreaseQuantity(item.id))}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${item.name}`} onClick={() => dispatch(increaseQuantity(item.id))}>+</button></div></div>
            <button className="remove-button" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </article>)}</div>
          <aside className="summary"><p className="eyebrow">Order summary</p><div><span>Subtotal</span><strong>{money(total)}</strong></div><div><span>Shipping</span><span className="free">Free</span></div><hr /><div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div><button className="button button-dark checkout-button" onClick={() => window.alert('Thank you for shopping with Northstar!')}>Checkout <span>→</span></button><button className="clear-button" onClick={() => dispatch(clearCart())}>Clear bag</button></aside>
        </div>
      )}
    </main>
  )
}

function About() {
  return <main className="page-content about-page"><div className="about-intro"><p className="eyebrow">Our story</p><h1>Designed for the<br /><em>way you live.</em></h1></div><div className="about-body"><div className="about-art">✳</div><div><p className="large-copy">Northstar is a small, independent store built around the idea that the things we live with should make life feel a little more considered.</p><p>We look for pieces with a point of view: materials that feel good in your hands, shapes that earn their place, and details that reveal themselves over time. No clutter, no noise — just good things, chosen carefully.</p><NavLink className="text-link" to="/">Return home <span>→</span></NavLink></div></div></main>
}

function NotFound() {
  return <main className="not-found"><p className="eyebrow">404</p><h1>Nothing here<br /><em>but good taste.</em></h1><NavLink className="button button-dark" to="/">Back to home <span>→</span></NavLink></main>
}

function App() {
  return <div className="app-shell"><Header /><Routes><Route path="/" element={<Home />} /><Route path="/products" element={<Products />} /><Route path="/cart" element={<Cart />} /><Route path="/about" element={<About />} /><Route path="*" element={<NotFound />} /></Routes><footer><span>© 2026 Northstar studio</span><span>Made for slow days.</span></footer></div>
}

export default App
