import { useState } from 'react'
import './App.css'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <main className="page-shell">
      <section className="form-card" aria-labelledby="form-title">
        <span className="eyebrow">GET IN TOUCH</span>
        <h1 id="form-title">Send us a message</h1>
        <p className="intro">
          Fill in the form below and we will get back to you as soon as we can.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                autoComplete="name"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="5"
              required
            />
          </div>

          <button type="submit">Send message <span aria-hidden="true">→</span></button>
          {submitted && (
            <p className="success" role="status">
              Thanks! Your message has been sent.
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default App
