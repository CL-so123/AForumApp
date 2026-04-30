import { Link } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../Client'
import { useParams } from 'react-router-dom'
const EditPost = () => {
    const [post, setPost] = useState({ title: "", content: "", image: "" })
    const { id } = useParams()
    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    const editPost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .update({ title: post.title, content: post.content, image: post.image })
            .eq('id', id)


        window.location = '/post/edit/:id';
    }

    const deletePost = async (event) => {
        event.preventDefault()
        await supabase
            .from('Posts')
            .delete()
            .eq('id', id)
        window.location = '/post/:id'


    }
    return (
        <div>
            <form>
                <label htmlFor="title"> title</label><br />
                <input type="text" id="title" name="title" onChange={handleChange} /> <br />
                <br />
                <label htmlFor="content"> content </label><br />
                <input type="text" id="content" name="content" onChange={handleChange} /> <br />
                <br />
                <label htmlFor="image"> image</label><br />
                <input type="text" id="image" name="image" onChange={handleChange} /> <br />
                <br />
                <button className = "editbutton"  onClick={editPost}> Edit</button>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )




}
export default EditPost