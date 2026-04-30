import { useParams } from 'react-router-dom'
import { supabase } from '../Client'
import { useEffect, useState } from 'react'
import PostBox from '../components/PostBox'
import EditPost from '../pages/EditPost'


const PostDetail = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)

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
            <EditPost />
        </div>

    )
}

export default PostDetail