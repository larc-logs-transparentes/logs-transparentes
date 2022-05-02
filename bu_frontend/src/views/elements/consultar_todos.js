import React, { Component, useEffect, useState } from 'react';
import {
  Row,
  Button,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input, 
  FormText
} from 'reactstrap';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { Loader } from '../../vibe/';
import PageLoaderContext from '../../vibe/components/PageLoader/PageLoaderContext';
import laptopImage from '../../assets/images/laptop.jpeg';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';

import api from '../../vibe/services/api';



export default function Consultar_Todos() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useHistory();
    //const [search, setse] = useState([]);

        useEffect(() => {
            const fetchPosts = async () => {
              try{
                const response = await api.get('/posts');
                setPosts(response.data)
                console.log(response)
              } catch (err) {
                if (err.response){
                  console.log(err.response.data);
                  console.log(err.response.status);
                  console.log(err.response.headers);
                } else {
                  console.log(`Error: ${err.message}`)
                }
              }
            }
            fetchPosts()
            //eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    //useEffect(() => {
    //  const filteredResults = posts.filter((post) =>
    //    ((post.hash).toLowerCase()).includes(search.toLowerCase())
    //    || ((post.zona).toLowerCase()).includes(search.toLowerCase()));
  
     // setSearchResults(filteredResults.reverse());
    //}, [posts, search])
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      
      const newPost = { id, title: postTitle, body: postBody };
      try {
        const response = await api.post('/posts', newPost);
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        history.push('/');
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  
    const handleEdit = async (id) => {
      
      const updatedPost = { id, title: editTitle, body: editBody };
      try {
        const response = await api.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
        setEditTitle('');
        setEditBody('');
        history.push('/');
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  
    const handleDelete = async (id) => {
      try {
        await api.delete(`/posts/${id}`);
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        history.push('/');
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
    
    return(
      <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home posts={searchResults} />
        </Route>
        <Route exact path="/post">
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route path="/edit/:id">
          <EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
    );
}

