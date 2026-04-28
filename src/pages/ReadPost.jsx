import { Link } from 'react-router-dom'

const ReadPost = () => {
    const [posts, setPosts] = useState([])
    const [order, setOrder] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: true })
            setPosts(data)
        }
        fetchPost()
    }, [])


     return (
        <div className="ReadPosts">
           
            {
                
                posts && posts.length > 0 ?
                    [...posts]
                        .sort((a, b) => a.id - b.id)
                        .map((post, index) =>
                            <Card
                                key={post.id}
                                id={post.id}
                                name={post.name}
                                speed={post.speed}
                                color={post.color}
                            />
                        ) : <h2>{'No Challenges Yet '}</h2>
            }
        </div>
    )
}

export default ReadPost


