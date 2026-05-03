import {useRoutes, Link} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import ReadPost from './pages/ReadPost'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'

function App() {
  const routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/createpost', element: <CreatePost />},
    {path: '/', element: <ReadPost />},
    {path: '/post/:id', element: <PostDetail />},
    {path: '/post/:id', element: <EditPost/> }
  ])
  
  

  return (
    <div className = "app">
      <nav className = "nav">
        <Link to="/">Home</Link>
        <Link to="/createPost" className = "create-link">Create New Post</Link>
      </nav>
      <h2 className = "myName">Cameron Parker</h2>
      <h2 className = "myName">Z23775775</h2>
      {routes}
    </div>
    
  )
}


export default App
