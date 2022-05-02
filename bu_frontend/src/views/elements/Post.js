import { Link } from 'react-router-dom';
import React from 'react';
const Post = ({ post }) => {
    return (
        <article className="post">
            <Link to={`/post/${post.id}`}>
                <h2>{post.zona}</h2>
                <h2>{post.secao}</h2>
                <h2>{post.uf}</h2>
                
            </Link>
            <p className="postBody">{
                (post.body).length <= 25
                    ? post.body
                    : `${(post.body).slice(0, 25)}...`
            }</p>
        </article>
    )
}

export default Post