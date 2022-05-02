import React, { Component, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";


const PostPage = ({ posts, handleDelete }) => {
    const { hash } = useParams();
    const post = posts.find(post => (post.hash).toString() === hash);
    return (
        <main>
            <article>
                {post &&
                    <>
                        <h2>{post.hash}</h2>
                        <p className="postDate">{post.zona}</p>
                        <p className="postBody">{post.secao}</p>
                        <p className="postBody">{post.uf}</p>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage