import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { callApi } from './api';
import { AccountForm, Posts, SinglePost, NewPostForm, Messages, Profile, SendMessage} from './components';






const App = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);

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

function logout() {
  localStorage.clear()
  setToken('')
  setUserData({})
}

  return (
    <>
      <Router>
      <div className='header'>
      <h1 className='title'>Stranger's Things</h1>
      <Link to="/" style={{textDecoration: 'none', color: 'black', fontSize: "1.5em"}}>Home</Link>
      { !token ?<Link to="/login" style={{textDecoration: 'none', color: 'black', fontSize: "1.5em"}}>Login</Link>:null}
      { token ?<Link to="/posts/new" style={{textDecoration: 'none', color: 'black', fontSize: "1.5em"}}>Add A Post</Link>:null}
      <Link to="/posts" style={{textDecoration: 'none', color: 'black', fontSize: "1.5em"}}>See All Post</Link>
      
      { token ? <Link to="/profile" style={{textDecoration: 'none', color: 'black', fontSize: "1.5em"}}>Profile</Link>:null}
      
      </div>
      
      <Switch>
        <Route exact path="/">
          {userData.username && <div className='homepage'>Hello {userData.username}
          { token ? <p>NOT YOU?<button className='deleteButton' onClick={logout}>LOGOUT</button></p> :null}
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
          <SinglePost 
          posts={posts} 
          userData={userData}
          token= {token}
          setPosts={setPosts}
          />
        </Route>
        <Route path='/posts/:postId/messages'>
          {token ? <SendMessage posts={posts} token={token} messages={messages} setMessages={setMessages}/> : ''}
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
        <Route path='/Messages'>
            <Messages 
              token={token}
              userData={userData}
            />
          </Route>
        <Route path='/Profile'>
          <Profile
            token={token}
            userData={userData}
          />
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