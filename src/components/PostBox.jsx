import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

const PostBox = ({ id, title, created_at }) => {
    return (
        <div className="Box">


            {created_at && (
                <p className="date">
                    Posted {formatDistanceToNow(new Date(created_at), {
                        addSuffix: true
                    })}
                </p>
            )}
            <h2>
                <Link to={`/post/${id}`}>
                    {title}
                </Link>
            </h2>
        </div>
    )
}

export default PostBox