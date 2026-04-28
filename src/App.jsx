import { useState } from 'react'
import {useRoutes, Link} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import ReadPost from './pages/ReadPost'

function App() {
  const routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/createpost', element: <CreatePost />},
    {path: '/', element: <ReadPost />}
  ])
  
  

  return (
    <div className = "app">
      <nav className = "nav">
        <Link to="/">Home</Link>
        <Link to="/createPost">Create New Post</Link>
      </nav>
      {routes}
    </div>
    
  )
}


export default App
