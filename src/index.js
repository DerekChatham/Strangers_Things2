import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { callApi } from './api';
import { AccountForm, Posts, SinglePost, NewPostForm,} from './components';






const App = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  const fetchUserData = async (token) => {
    const { data } = await callApi({
      url: '/users/me',
      token,
    });
    return data;
  };

  const fetchPosts = async () => {
    const {
      data: { posts },
    } = await callApi({
      url: '/posts',
    });
    return posts;
  };

  useEffect(async () => {
    // const posts = await fetchPosts();
    // setPosts(posts);
    if (!token) {
      setToken(localStorage.getItem('token'));
      return;
    }
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }
  }, [token]);

  useEffect(async () => {
    const posts = await fetchPosts();
    setPosts(posts);
  }, []);

  return (
    <>
      <Router>
      <div className='header'>
      <h1 className='title'>Stranger's Things</h1>
      <Link to="/" style={{textDecoration: 'none', color: 'black', fontSize: "1.5em"}}>Home</Link>
      <Link to="/login" style={{textDecoration: 'none', color: 'black', fontSize: "1.5em"}}>Login</Link>
      <Link to="/posts/new" style={{textDecoration: 'none', color: 'black', fontSize: "1.5em"}}>Add A Post</Link>
      <Link to="/posts" style={{textDecoration: 'none', color: 'black', fontSize: "1.5em"}}>See All Post</Link>
      <Link to="/inbox" style={{textDecoration: 'none', color: 'black', fontSize: "1.5em"}}>Inbox</Link>
      
      </div>
      
      <Switch>
        <Route exact path="/">
          {userData.username && <div className='homepage'>Hello {userData.username}<div>
            <span>Not You? <button className='logout' title='LOGOUT'>LOGOUT</button></span>
          </div>
          </div>}
          <div className='welcome'><img src='/welcome.jpg'/></div>
        </Route>
        <Route exact path="/posts">
          <Posts posts={posts} />
        </Route>
        <Route path="/posts/new">
          <NewPostForm
            token={token}
            setPosts={setPosts}
            posts={posts}
            action="add"
          />
          <div className='sellpic'><img src='/sell.jpg'/></div>
        </Route>
        <Route path="/posts/:postId/edit">
          <NewPostForm
            token={token}
            setPosts={setPosts}
            posts={posts}
            action="edit"
          />
          
        </Route>
        <Route path="/posts/:postId">
          <SinglePost posts={posts} />
        </Route>
        <Route path="/register">
          <AccountForm
            action="register"
            setToken={setToken}
            setUserData={setUserData}
          />
        </Route>
        <Route path="/login">
          <AccountForm
            action="login"
            setToken={setToken}
            setUserData={setUserData}
          />
          <div className='loginpic'><img src='/login.png'/></div>
        </Route>
        <Route path="/inbox">
          <h2>Messages</h2>
        </Route>
     </Switch>
    </Router>
    </>
    
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);