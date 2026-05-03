import ReadPost from './ReadPost'


const home = () => {
    return(
        <div className="home">
            <h1 className = "forum-title">Oblivion Hub</h1>
            <h2 className = "latest-posts">Latest Posts</h2>
             <ReadPost />
        </div>
    )
}
export default home