import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { DeletePost, SendMessage } from '.';

const SinglePost = ({ posts, userData, token, setPosts }) => {
  
  const { postId } = useParams();
  const post = posts.find((post) => postId === post._id);
  const history = useHistory();

 const loggedUser = userData.username === post.author.username;
  
  return (
    <>
      {post ? (
        <div>
         <h3>{post.title}</h3>
          <p>Posted by: {post.author.username}</p>
          <p>Price: {post.price}</p>
          <p>Location: {post.location}</p>
          <p>Delivers: {post.willDeliver ? 'Yes' : 'No'}</p>
          {loggedUser ? (
            <>
              <button variant='secondary' onClick={() => history.push(`${postId}/edit`)}>
                Edit
              </button>{' '}
              <DeletePost token={token} postId={postId} setPosts={setPosts} posts={posts} />
            </>
          ) : (
            ''
          )}
          {token ? (
            <>
              {!loggedUser ? <SendMessage token={token} postId={postId} /> : ''}
            </>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
};
          

export default SinglePost;