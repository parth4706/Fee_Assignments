import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import InfiniteScrolling from './assets/infinitescrolling.jsx'

const app = document.querySelector('#app')

if (!app) {
  throw new Error('App container was not found')
}

createRoot(app).render(
  <StrictMode>
    <InfiniteScrolling />
  </StrictMode>,
)
