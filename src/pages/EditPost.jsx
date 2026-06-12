import { useState } from 'react'
import { supabase } from '../Client'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const EditPost = () => {
    const [post, setPost] = useState({ title: "", content: "", image: "" })
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                navigate('/login')
            }
        }
        checkUser()

    }, [navigate])

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('title, content, image')
                .eq('id', id)
                .single()

            if (error) {
                console.error(error)
                return
            }

            setPost({
                title: data.title || "",
                content: data.content || "",
                image: data.image || ""
            })
        }

        fetchPost()
    }, [id])
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


        window.location = '/';
    }





    return (
        <div>
            <form className="edit-form">
                <label htmlFor="title"> title</label><br />
                <input type="text" id="title" name="title" onChange={handleChange} /> <br />
                <br />
                <label htmlFor="content"> content </label><br />
                <input type="text" id="content" name="content" onChange={handleChange} /> <br />
                <br />
                <label htmlFor="image"> image</label><br />
                <input type="text" id="image" name="image" onChange={handleChange} /> <br />
                <br />
                <input type="submit" value="Submit" onClick={editPost} />


            </form>
        </div>
    )




}
export default EditPost