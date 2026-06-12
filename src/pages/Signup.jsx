import { useState } from 'react'
import { supabase } from '../Client'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name : displayName
        }
      }
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Account created!')
      navigate('/')
    }
  }

  return (
    <form className = "signup-text" onSubmit={handleSignup}>
      <h2>Sign Up</h2>

      <input
        type= "text"
        placeholder= "Display Name"
        onChange={(e) => setDisplayName(e.target.value)}
        required
        />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default Signup