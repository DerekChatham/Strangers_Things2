import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { callApi } from '../api';


const DeletePost = ({ token, postId, setPosts, posts }) => {
  const history = useHistory();
 

  const API_URL = `/posts/${postId}`;

  const handleClick = async () => {
    try {
      await callApi({
        url: API_URL,
        method: 'DELETE',
        token,
      });
     
      history.push('/');
      
      const remainingPost = posts.filter((post)=>post._id !== postId)
      setPosts(remainingPost);
      
    
    } catch (error) {
      console.error('Error deleting a post:', error);
      
    }
  };
  
  return (
    <>
      <button onClick={handleClick}>Delete Post</button>
    </>
  );
};

export default DeletePost;