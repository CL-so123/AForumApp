import { useRoutes, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './Client'
import './App.css'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import ReadPost from './pages/ReadPost'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  console.log("SESSION IN RENDER:", session)

  useEffect(() => {
    let mounted = true

    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (mounted) {
        setSession(session ?? null)
        setLoading(false)
      }
    }

    initAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session ?? null)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/createpost', element: <CreatePost /> },
    { path: '/', element: <ReadPost /> },
    { path: '/post/:id', element: <PostDetail /> },
    { path: '/edit/:id', element: <EditPost /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> }
  ])
  if (loading) return null

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null) // immediately update UI
  }



  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Home</Link>


        {session?.user?.id && (
          <Link to="/createpost" className="create-link">
            Create New Post
          </Link>
        )}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>

        {<Link to="/login">Login</Link>}
        {<Link to="/signup">Signup</Link>}
      </nav>
      <h2 className="myName">Cameron Parker</h2>
      <h2 className="myName">Z23775775</h2>
      {routes}
    </div>

  )
}


export default App