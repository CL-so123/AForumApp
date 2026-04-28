import { Link } from 'react-router-dom'
const PostBox = (props) => {
    return (
        <div className="Box">
            
                <h2 className="title">Title: {props.title}</h2>
                <h3 className="author">Content: {props.content}</h3>
                <p className="description">Image (Optional): {props.image}</p>
            
        </div>
    )
}
export default PostBox