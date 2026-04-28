import {Link} from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../Client'

const CreatePost = () =>{
    
    const [post, setPost] = useState({title: "", content:"", image: ""})
     const handleChange = (event) => {
        const { title, value } = event.target
        setPost((prev) => {
            return {
                ...prev,
                [title]: value,
            }
        })
    }

    const createPost = async (event) =>{
        event.preventDefault();
        await supabase
            .from('Posts')
            .insert({title: post.title, content: post.content, image: post.image})
            .select()

        window.location = "/createPost"
    }
    return(
        <div>
            <form>
                <label htmlFor= "title"> title</label><br />
                <input type= "text" id = "title" name = "title" onChange={handleChange} /> <br />
                <br />
                <label htmlFor = "content"> content </label><br />
                <input type = "content" id = "content" name = "content" onChange={handleChange} /> <br />
                <br />
                <label htmlFor = "image"> image</label><br />
                <input type = "image" id = "image" name = "image" onChange={handleChange} /> <br />
            </form>
        </div>
    )

    

    
}
export default CreatePost