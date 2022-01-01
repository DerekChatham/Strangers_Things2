import React from 'react';
import { useParams } from 'react-router-dom';


import React from 'react';
import { useParams } from 'react-router-dom';


const SinglePost = ({ posts }) => {
  const { postId } = useParams();
  const post = posts.find((post) => postId === post._id);
  console.log('SINGLE POST', post);

  const deletePost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${post._id}` , {
        method: "DELETE",
        token,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      
      })
      } catch (error) {
      console.error("Cannot Delete Post");
    }
  }

  return (
    <>
      {post ? (
        <div>
          <h3>{post.title}</h3>
          <p>Posted by: {post.author.username}</p>
          <p>Price: {post.price}</p>
          <p>Location: {post.location}</p>
          <p>Delivers: {post.willDeliver ? 'Yes' : 'No'}</p>
          <div>
            <button onClick={deletePost}>Delete Post</button>
            
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default SinglePost;

export default SinglePost;