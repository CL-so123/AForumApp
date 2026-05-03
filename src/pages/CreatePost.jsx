import { useState } from 'react'
import { supabase } from '../Client'

const CreatePost = () =>{
    
    const [post, setPost] = useState({title: "", content:"", image: ""})
     const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createPost = async (event) =>{
        event.preventDefault();
        await supabase
            .from('Posts')
            .insert({title: post.title, content: post.content, image: post.image})
            .select()

        window.location = "/"
    }
    return(
        <div>
             <form className = "post-form" onSubmit={createPost}>
                <label htmlFor= "title"> title</label><br />
                <input type= "text" id = "title" name = "title" onChange={handleChange} /> <br />
                <br />
                <label htmlFor = "content"> content </label><br />
                <input type = "text" id = "content" name = "content" onChange={handleChange} /> <br />
                <br />
                <label htmlFor = "image"> image (optional)</label><br />
                <input type = "text" id = "image" name = "image" onChange={handleChange} /> <br />
                 <br />
                 <input className = "creation-submit" type="submit" value="Submit" />
            </form>
        </div>
    )

    

    
}
export default CreatePost