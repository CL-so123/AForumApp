import { useParams } from 'react-router-dom'
import { supabase } from '../Client'
import { useEffect, useState } from 'react'
import PostBox from '../components/PostBox'
import EditPost from '../pages/EditPost'
import { Link } from 'react-router-dom'



const PostDetail = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select()
                .eq('id', id)
                .single()

            if (error) {
                console.error(error)
                return
            }

            setPost(data)
        }

        fetchPost()
    }, [id])

    if (!post) return <h2>Loading...</h2>

    const deletePost = async (event) => {
        event.preventDefault()
        await supabase
            .from('Posts')
            .delete()
            .eq('id', id)
        window.location = '/'
    }


    const handleCommentSubmit = async () => {
        if (!comment.trim()) return

        console.log('New comment:', comment)

        // later: save to Supabase here

        setComment('') // clear input after submit
    }

    return (
        <div>
            <PostBox
                id={post.id}
                title={post.title}
                content={post.content}
                image={post.image}
                created_at={post.created_at}
                full={true}

            />

            <Link to={`/edit/${id}`} className="edit-link">
                <button className="editbutton" >Edit</button>
            </Link>
            <button className="deleteButton" onClick={deletePost}>Delete</button>


            <div className="comment-box">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={handleCommentSubmit}>
                    Submit
                </button>
            </div>

        </div>

    )

}

export default PostDetail