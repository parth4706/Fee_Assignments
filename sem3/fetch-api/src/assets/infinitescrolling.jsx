import { useEffect, useState } from 'react'

const USERS_API_URL = 'https://dummyjson.com/users'
const PAGE_SIZE = 30

export default function InfiniteScrolling() {
  const [users, setUsers] = useState([])
  const [skip, setSkip] = useState(0)
  const [loading, setLoading] = useState(false)
  const [totalUsers, setTotalUsers] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchUsers() {
      setLoading(true)

      try {
        const response = await fetch(
          `${USERS_API_URL}?limit=${PAGE_SIZE}&skip=${skip}`,
        )

        if (!response.ok) {
          throw new Error(`Users request failed with status ${response.status}`)
        }

        const data = await response.json()

        if (cancelled) {
          return
        }

        setUsers((currentUsers) => [...currentUsers, ...data.users])
        setTotalUsers(data.total)
        setError('')
      } catch (requestError) {
        if (!cancelled) {
          console.error('Unable to load users:', requestError)
          setError('Unable to load users. Please try again later.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchUsers()

    return () => {
      cancelled = true
    }
  }, [skip])

  function handleScroll(event) {
    const container = event.currentTarget
    const nearBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight - 100

    if (nearBottom && !loading) {
      setSkip((currentSkip) =>
        totalUsers > 0 && currentSkip + PAGE_SIZE >= totalUsers
          ? 0
          : currentSkip + PAGE_SIZE,
      )
    }
  }

  return (
    <main>
      <h1>Infinite scrolling users</h1>
      {error && <p role="alert">{error}</p>}
      <div
        onScroll={handleScroll}
        style={{ height: '500px', overflowY: 'auto' }}
      >
        <ol>
          {users.map((user, index) => (
            <li key={`${user.id}-${index}`}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ol>
        
      </div>
      {loading && <p>Loading...</p>}
    </main>
  )
}
