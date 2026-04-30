import { supabase } from '../Client'
import { useEffect, useState } from 'react'
import PostBox from '../components/PostBox'

const ReadPost = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('id, title, content, created_at')
                .order('created_at', { ascending: false })

            if (error) {
                console.error(error)
                return
            }

            setPosts(data)
        }

        fetchPosts()
    }, [])

    return (
        <div className="ReadPosts">
            {posts.length > 0 ? (
                posts.map(post => (
                    <PostBox
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        created_at={post.created_at}
                        content={post.content}
                    />
                    
        ))
            ) : (
                <h2>No posts yet</h2>
            )}
        </div>
    )
}

export default ReadPost