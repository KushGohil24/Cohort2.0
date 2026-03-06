import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/post'
import { usePost } from '../hook/usePost'
import Nav from '../../shared/components/Nav'

const Feed = () => {
    const {feed, loading, handleGetFeed, handleLike, handleUnlike} = usePost();
    useEffect(()=>{
        handleGetFeed();
    }, [])
    if(loading){
        return (<main><h1>Loading feed...</h1></main>)
    }
    console.log(feed);
  return (
    <main className='feed-page'>
        <div className='feed'>
            <Nav />
            <div className='posts'>
                {feed.map(post => {
                    return <Post user={post.user} post={post} handleLike={handleLike} handleUnlike={handleUnlike}/>
                })}
            </div>
        </div>    
    </main>
  )
}

export default Feed
