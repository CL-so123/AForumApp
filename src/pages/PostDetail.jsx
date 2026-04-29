import { useParams } from 'react-router-dom'
import { supabase } from '../Client'
import { useEffect, useState } from 'react'
import PostBox from '../components/PostBox'


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
    <PostBox
      id={post.id}
      created_at={post.created_at}
      title={post.title}
      content={post.content}
      image={post.image}
    />
  )
}

export default PostDetail