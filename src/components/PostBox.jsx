import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import './PostBox.css'

const PostBox = ({ id, title, created_at }) => {
    return (
        <Link to={`/post/${id}`} className= "box-link">
            <div className="Box">
                <h2> {title} </h2>



                {created_at && (
                    <p className="date">
                        Posted {formatDistanceToNow(new Date(created_at), {
                            addSuffix: true
                        })}
                    </p>
                )}





            </div>
        </Link>
    )
}

export default PostBox