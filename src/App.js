import React from 'react';
import { Button, Table, Form, FormGroup } from 'reactstrap';
import axios from 'axios';
import './style.css';
import {BrowserRouter , Route , Switch } from 'react-router-dom';

import Main from './Main';
import Home from './Home';
import About from './About';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      userId: '',
      title: '',
      body: '',
      posts: []
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  // CREATE
  createPost = async () => {
    const { data } = await axios.post(API_URL, {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body
    });
    const posts = [...this.state.posts];
    posts.push(data);
    this.setState({ posts, userId: '', title: '', body: '' });
  };

  // UPDATE
  updatePost = async () => {
    const { data } = await axios.put(`${API_URL}/${this.state.id}`, {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body
    });
    const posts = [...this.state.posts];
    const postIndex = posts.findIndex(post => post.id === this.state.id);
    posts[postIndex] = data;
    this.setState({ posts, userId: '', title: '', body: '', id: '' });
  };

  // READ
  getPosts = async () => {
    const { data } = await axios.get(API_URL);
    this.setState({ posts: data });
  };

  // DELETE
  deletePost = async postId => {
    await axios.delete(`${API_URL}/${postId}`);
    let posts = [...this.state.posts];
    posts = posts.filter(post => post.id !== postId);
    this.setState({ posts });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.id) {
      this.updatePost();
    } else {
      this.createPost();
    }
  };

  selectPost = post => {
    this.setState({ ...post });
  };

  render() {
    return (

      <div>
        <h1>Blog Posts</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.state.id && (
            <>
              <FormGroup>
                <label>Post ID : </label>
                <input
                  name="userId"
                  type="text"
                  value={this.state.id}
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
              value={this.state.userId}
              onChange={this.handleChange}
            />
          </FormGroup>
          <br />
          <FormGroup>
            <label>Title : </label>
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </FormGroup>
          <br />
          <div>
            <label>Body : </label>
            <input
              name="body"
              type="text"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <FormGroup>
            <button type="submit">
              {this.state.id ? 'Update' : 'Add'} Post
            </button>
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
            {this.state.posts.map(post => {
              return (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.userId}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.selectPost(post)}
                    >
                      Edit
                    </Button>

                    <Button
                      color="danger"
                      onClick={() => this.deletePost(post.id)}
                    >
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
}
