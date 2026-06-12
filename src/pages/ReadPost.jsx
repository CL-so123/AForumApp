import { supabase } from '../Client'
import { useEffect, useState } from 'react'
import PostBox from '../components/PostBox'

const ReadPost = () => {
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortMode, setSortMode] = useState('newest')

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('id, title, content, created_at, upvotes, display_name')
                .order('created_at', { ascending: false })

            if (error) {
                console.error(error)
                return
            }

            setPosts(data)
        }

        fetchPosts()
    }, [])
    const term = searchTerm.toLowerCase().trim()

    const filteredPosts = posts
        .map(post => {
            const title = post.title.toLowerCase()

            let score = 0

            if (title.startsWith(term)) score = 2
            else if (title.includes(term)) score = 1

            return { ...post, score }
        })
        .filter(post => post.score > 0)
        .sort((a, b) => b.score - a.score)


    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (sortMode === 'newest') {
            return new Date(b.created_at) - new Date(a.created_at)
        }

        if (sortMode === 'popular') {
            return (b.upvotes || 0) - (a.upvotes || 0)
        }

        return 0
    })


    return (
        <div className="ReadPosts">
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <div className="sort-buttons">
                <button onClick={() => setSortMode('newest')}>
                    Newest
                </button>

                <button onClick={() => setSortMode('popular')}>
                    Most Popular
                </button>
            </div>
            {filteredPosts.length > 0 ? (
                sortedPosts.map(post => (
                    <PostBox
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        created_at={post.created_at}
                        upvotes={post.upvotes}
                        display_name={post.display_name}
                    />
                ))
            ) : (
                <h2>No posts yet</h2>
            )}
        </div>
    )
}

export default ReadPost