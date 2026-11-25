import { useEffect, useState } from 'react'

const USERS_API_URL = 'https://dummyjson.com/users'
export default function App() {
  const [users, setUsers] = useState([])
  const [skip, setSkip] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [searchOutput, setSearchOutput] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${USERS_API_URL}?limit=5&skip=${skip}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Users request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setUsers(data.users)
        setError('')
      })
      .catch((requestError) => {
        console.error('Unable to load users:', requestError)
        setError('Unable to load users. Please try again later.')
      })
  }, [skip])

  useEffect(() => {
    const endpoint = searchText
      ? `${USERS_API_URL}/search?q=${encodeURIComponent(searchText)}`
      : `${USERS_API_URL}?limit=5`

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Search request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then((data) => setSearchOutput(data.users))
      .catch((requestError) => {
        console.error('Unable to search users:', requestError)
        setSearchOutput([])
      })
  }, [searchText])

  const page = skip / 5 + 1

  return (
    <main>
      <h1>User names</h1>
      {error && <p>{error}</p>}
      <ol start={users[0]?.id || 1}>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ol>
      <p>Page {page}</p>
      <button onClick={() => setSkip((currentSkip) => Math.max(0, currentSkip - 5))}>
        backward
      </button>
      <button onClick={() => setSkip((currentSkip) => currentSkip + 5)}>
        forward
      </button>

      <label htmlFor="user-search">Search names</label>
      <input
        id="user-search"
        type="search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Type here..."
      />

      <ul>
        {searchOutput.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </main>
  )
}
