import { useRoutes, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import ReadPost from './pages/ReadPost'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/createpost', element: <CreatePost /> },
    { path: '/', element: <ReadPost /> },
    { path: '/post/:id', element: <PostDetail /> },
    { path: '/edit/:id', element: <EditPost /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> }
  ])



  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/createPost" className="create-link">Create New Post</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
      <h2 className="myName">Cameron Parker</h2>
      <h2 className="myName">Z23775775</h2>
      {routes}
    </div>

  )
}


export default App
