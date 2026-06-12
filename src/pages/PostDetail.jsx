import { useParams } from 'react-router-dom'
import { supabase } from '../Client'
import { useEffect, useState } from 'react'
import PostBox from '../components/PostBox'
import { Link } from 'react-router-dom'




const PostDetail = () => {
    const { id } = useParams()

    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [summary, setSummary] = useState('')
    const [loadingSummary, setLoadingSummary] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }

        getUser()
    }, [])


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

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('Comments')
            .select('*')
            .eq('post_id', id)
            .order('created_at', { ascending: true })

        if (error) return console.error(error)
        setComments(data || [])
    }

    // fetch comments
    useEffect(() => {

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

    const generateSummary = async () => {
        if (!post || !post.content) {
            setSummary("Post not loaded yet.");
            return;
        }

        setLoadingSummary(true);
        setSummary("");

        try {
            const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_LLM_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant that writes concise 1-2 sentence summaries that are based on the content of the post."
                        },
                        {
                            role: "user",
                            content: `TITLE: ${post.title || ""}\n\nCONTENT: ${post.content}`
                        }
                    ],
                    temperature: 0.3
                }),
            });

            const data = await res.json();

            console.log("GROQ RESPONSE:", data);

            if (data?.error) {
                setSummary(`Error: ${data.error.message}`);
                return;
            }

            const text = data?.choices?.[0]?.message?.content;

            if (!text) {
                setSummary("No summary generated.");
            } else {
                setSummary(text.trim());
            }

        } catch (err) {
            console.error(err);
            setSummary("Request failed.");
        }

        setLoadingSummary(false);
    };



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



            {user && (
                <Link to={`/edit/${id}`}>
                    <button className="editbutton">Edit</button>
                </Link>
            )}

            {user && (
                <button className="deleteButton" onClick={deletePost}>
                    Delete
                </button>
            )}

            {user && (
                <button className="upvoteButton" onClick={handleUpvote}>
                    👍 Upvote
                </button>
            )}

            {user && (
                <button onClick={generateSummary} className="summaryButton">
                    ✨ Generate TLDR
                </button>
            )}

            {loadingSummary && <p>Generating Summary...</p>}

            {summary && (
                <div className="summaryBox">
                    <h3>TLDR</h3>
                    <p>{summary}</p>
                </div>
            )}

            {/* comment input */}
            {user && (
                <div className="comment-box">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button className="submitButton" onClick={handleCommentSubmit}>
                        Submit
                    </button>
                </div>
            )}

            {/* comments list */}
            <div className="comments">
                <h3>Comments</h3>

                {comments.length === 0 && <p>No comments yet.</p>}

                {comments.map((c) => (
                    <div key={c.id} className="comment">
                        - {c.comment}   <br></br>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default PostDetail