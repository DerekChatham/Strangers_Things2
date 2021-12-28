import React, { useState } from 'react';
import { callApi } from '../api';
import { useHistory, useParams } from 'react-router-dom';

const NewPostForm = ({ token, setPosts, posts, action }) => {
  const history = useHistory();
  const { postId } = useParams();

  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    price: 0,
    location: '',
    willDeliver: false,
  });
  const isEdit = action === 'edit';
  const title = isEdit ? 'Edit this post' : 'Add a new post';
  const method = isEdit ? 'PATCH' : 'POST';
  const API_URL = isEdit ? `/posts/${postId}` : `/posts`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        data: { post },
      } = await callApi({
        url: API_URL,
        method: method,
        body: {
          post: {
            title: newPost.title,
            description: newPost.description,
            price: newPost.price,
            location: newPost.location,
            willDeliver: newPost.willDeliver,
          },
        },
        token,
      });

      if (isEdit) {
        //* grab existing posts other than the one ive edited
        //* add in the post ive edited
        const filteredPosts = posts.filter((post) => post._id !== postId);
        setPosts([...filteredPosts, post]);
      } else {
        //* Otherwise I am creating a post, so just take my old posts and add this new one to the bottom of the list
        setPosts([...posts, post]);
      }
      //* No matter what send users to the /posts page when we are done
      history.push('/posts');
    } catch (error) {
      console.error('error adding a post: ', error);
    }
  };

  const handlePostFieldChange = (property) => (event) => {
    if (property === 'willDeliver') {
      setNewPost({ ...newPost, [property]: event.target.checked });
    } else {
      setNewPost({ ...newPost, [property]: event.target.value });
    }
  };

  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          onChange={handlePostFieldChange('title')}
          value={newPost.title}
        ></input>
        <input
          type="text"
          placeholder="description"
          onChange={handlePostFieldChange('description')}
          value={newPost.description}
        ></input>
        <input
          type="number"
          placeholder="price"
          onChange={handlePostFieldChange('price')}
          value={newPost.price}
        ></input>
        <input
          type="text"
          placeholder="location"
          onChange={handlePostFieldChange('location')}
          value={newPost.location}
        ></input>
        <label>
          Deliver ?
          <input
            type="checkbox"
            onChange={handlePostFieldChange('willDeliver')}
            value={newPost.willDeliver}
          ></input>
        </label>
        <button>{title}</button>
      </form>
    </>
  );
};

export default NewPostForm;