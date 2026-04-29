import {Link} from 'react-router-dom'
import ReadPost from './ReadPost'
import PostBox from '../components/PostBox'

const home = () => {
    return(
        <div className="home">
            <h1>Forum Hub</h1>
             <ReadPost />
        </div>
    )
}
export default home