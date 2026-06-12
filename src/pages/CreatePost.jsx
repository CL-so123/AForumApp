import { useState } from 'react'
import { supabase } from '../Client'
import { useNavigate } from 'react-router-dom'
import {useEffect} from 'react'

const CreatePost = () => {
    const navigate = useNavigate()

    const [post, setPost] = useState({ title: "", content: "", image: "" })

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                navigate('/login') // or '/' if you prefer
                return
            }

            setUser(user)
            setLoading(false)
        }

        checkAuth()
    }, [navigate])
    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
        const { data: { user } } = await supabase.auth.getUser()
        const { error } = await supabase
            .from('Posts')
            .insert({ title: post.title, content: post.content, image: post.image, user_id: user.id, display_name: user.user_metadata.display_name})
            .select()

        if (error) {
            alert(error.message)
            return
        }

        window.location = "/"
    }
    if(loading) return null
    return (
        <div>
            <form className="post-form" onSubmit={createPost}>
                <label htmlFor="title"> title</label><br />
                <input type="text" id="title" name="title" onChange={handleChange} /> <br />
                <br />
                <label htmlFor="content"> content </label><br />
                <input type="text" id="content" name="content" onChange={handleChange} /> <br />
                <br />
                <label htmlFor="image"> image (optional)</label><br />
                <input type="text" id="image" name="image" onChange={handleChange} /> <br />
                <br />
                <input className="creation-submit" type="submit" value="Submit" />
            </form>
        </div>
    )




}
export default CreatePost