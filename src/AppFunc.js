import React, { useState, useEffect } from 'react';
import { Button, Table, Form, FormGroup } from 'reactstrap';
import axios from 'axios';
import './style.css';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function AppFunc() {
  const [state, setState] = useState({
    id: '',
    userId: '',
    title: '',
    body: '',
    posts: []
  });

  // CREATE
  const createPost = async () => {
    const { data } = await axios.post(API_URL, {
      userId: state.userId,
      title,
      body
    });
    const posts = [...posts];
    posts.push(data);
  };

  // UPDATE
  const updatePost = async () => {
    const { data } = await axios.put(`${API_URL}/${id}`, {
      userId,
      title,
      body
    });
    const posts = [...posts];
    const postIndex = posts.findIndex(post => post.id === id);
    posts[postIndex] = data;
  };

  // READ
  const getPosts = async () => {
    const { data } = await axios.get(API_URL);
    setPosts(data);
  };

  // DELETE
  const deletePost = async postId => {
    await axios.delete(`${API_URL}/${postId}`);
    let posts = [...posts];
    posts = posts.filter(post => post.id !== postId);
    setPosts(posts);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      updatePost();
    } else {
      createPost();
    }
  };

  // const selectPost = post => {
  //   this.setState({ ...post });
  // };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <Form onSubmit={handleSubmit}>
        {id && (
          <>
            <FormGroup>
              <label>Post ID : </label>
              <input
                name="userId"
                type="text"
                onChange={({ target: { value } }) => setState({ id: value })}
                value={id}
                disabled
              />
            </FormGroup>
            <br />
          </>
        )}
        <FormGroup>
          <label>User ID : </label>
          <input
            name="userId"
            type="text"
            value={userId}
            onChange={({ target: { value } }) => setState({ userId: value })}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <label>Title : </label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={({ target: { value } }) => setState({ title: value })}
          />
        </FormGroup>
        <br />
        <div>
          <label>Body : </label>
          <input
            name="body"
            type="text"
            value={body}
            onChange={({ target: { value } }) => setBody(value)}
          />
        </div>
        <br />
        <FormGroup>
          <button type="submit">{id ? 'Update' : 'Add'} Post</button>
        </FormGroup>
        <br />
      </Form>
      <Table bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>User Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <Button color="primary" onClick={() => selectPost(post)}>
                    Edit
                  </Button>

                  <Button color="danger" onClick={() => deletePost(post.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
