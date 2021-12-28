import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const styles = {
  searchContainer: {
    display: 'flex',
   
    padding: '16px',
    alignItems: 'center',
  },
  searchInput: {
    margin: '0 16px',
  },
};

const postMatches = (post, searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  const {
    description,
    location,
    title,
    author: { username },
  } = post;

  const toMatch = [description, location, title, username];

  for (const field of toMatch) {
    if (field.toLowerCase().includes(searchTermLower)) {
      return true;
    }
  }
};

const deletePost = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${post._id}` , {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }

    })

    const data = await response.json();

      
  } catch (error) {
    console.log(error);
  }
}

const Posts = ({ posts }) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const postsToDisplay = posts.filter((post) => postMatches(post, searchTerm));
  return (
    <>
      <div style={styles.searchContainer}>
        <h2>Posts</h2>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="search for posts"
          value={searchTerm}
          onChange={(event) => {
            console.log(event.target.value);
            setSearchTerm(event.target.value);
          }}
        ></input>
      </div>
      {postsToDisplay.length ? (
        postsToDisplay.map((post) => (
          <div key={post._id} style={{ border: '1px solid black' }}>
            <h5>{post.title}</h5>
            <div>Posted by: {post.author.username}</div>
            <div>Description: {post.description}</div>
            <div>Location: {post.location}</div>
            <div id ='buttons'>
            <button onClick={() => history.push(`/posts/${post._id}`)}>
              View Post
            </button>
            <button onClick={deletePost}>Delete Post</button>
            </div>
          </div>
        ))
      ) : (
        <div>No posts to display</div>
      )}
    </>
  );
};

export default Posts;