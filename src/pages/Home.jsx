import {Link} from 'react-router-dom'
import ReadPost from './ReadPost'
import PostBox from '../components/PostBox'
import { formatDistanceToNow } from 'date-fns'

const home = () => {
    return(
        <div className="home">
            <h1 className = "forum-title">Forum Hub</h1>
            <h2 className = "latest-posts">Latest Posts</h2>
             <ReadPost />
        </div>
    )
}
export default home