import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import './PostBox.css'


const PostBox = ({ id, title, content, image, created_at, upvotes, full = false }) => {
    const boxContent = (
        <div className="Box">
            {created_at && (
                <p className="date">
                    Posted {formatDistanceToNow(new Date(created_at), {
                        addSuffix: true
                    })}
                </p>
            )}
            <h2 className = "title">{title}</h2>
            <p className="upvotes">
                👍 {upvotes || 0} upvotes
            </p>



            {full && content && (
                <p className="content">{content}</p>
            )}

            {full && image && (
                <img src={image} alt="Post" className="post-image" />
            )}
        </div>
    )

    // Only wrap in Link when it's NOT full view
    return full ? boxContent : (
        <div>
            <Link to={`/post/${id}`} className="box-link">
                {boxContent}
            </Link>


        </div>
    )
}

export default PostBox