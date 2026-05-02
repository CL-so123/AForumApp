import { useParams } from 'react-router-dom'
import { supabase } from '../Client'
import { useEffect, useState } from 'react'
import PostBox from '../components/PostBox'
import EditPost from '../pages/EditPost'
import { Link } from 'react-router-dom'




const PostDetail = () => {
    const { id } = useParams()

    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    // fetch post
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
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

    // fetch comments
    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('Comments')
                .select('*')
                .eq('post_id', id)
                .order('created_at', { ascending: true })

            if (error) {
                console.error(error)
                return
            }

            setComments(data || [])
        }
        fetchComments()
    }, [id])


    if (!post) return <h2>Loading...</h2>

    // delete post
    const deletePost = async () => {
        await supabase
            .from('Posts')
            .delete()
            .eq('id', id)

        window.location = '/'
    }

    // add comment
    const handleCommentSubmit = async () => {
        if (!comment.trim()) return

        const { error } = await supabase
            .from('Comments')
            .insert({
                post_id: id,
                comment: comment
            })

        if (error) return console.error(error)

        setComment('')
        fetchComments()
    }

    // upvote
    const handleUpvote = async () => {
        const newUpvotes = (post.upvotes || 0) + 1

        const { error } = await supabase
            .from('Posts')
            .update({ upvotes: newUpvotes })
            .eq('id', id)

        if (!error) {
            setPost(prev => ({
                ...prev,
                upvotes: newUpvotes
            }))
        }
    }

    return (
        <div>

            <PostBox
                id={post.id}
                title={post.title}
                content={post.content}
                image={post.image}
                created_at={post.created_at}
                upvotes={post.upvotes}
                full={true}
            />

            

            <Link to={`/edit/${id}`}>
                <button className="editbutton">Edit</button>
            </Link>

            <button className="deleteButton" onClick={deletePost}>
                Delete
            </button>

            <button onClick={handleUpvote}>
                👍 Upvote
            </button>

            {/* comment input */}
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

            {/* comments list */}
            <div className="comments">
                <h3>Comments</h3>

                {comments.length === 0 && <p>No comments yet.</p>}

                {comments.map((c) => (
                    <div key={c.id} className="comment">
                        - {c.comment}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default PostDetail