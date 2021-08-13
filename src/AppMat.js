import React from 'react';
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell
} from '@material-ui/core';
import axios from 'axios';
import './style.css';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default class AppMat extends React.Component {
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
        <form onSubmit={this.handleSubmit}>
          {this.state.id && (
            <>
              <div>
                <label>Post ID : </label>
                <input
                  name="userId"
                  type="text"
                  value={this.state.id}
                  disabled
                />
              </div>
              <br />
            </>
          )}
          <div>
            <label>User ID : </label>
            <input
              name="userId"
              type="text"
              value={this.state.userId}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div>
            <label>Title : </label>
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
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
          <div>
            <button type="submit">
              {this.state.id ? 'Update' : 'Add'} Post
            </button>
          </div>
          <br />
        </form>
        <Table bordered>
          <TableHead>
            <TableRow>
              <th>Id</th>
              <th>User Id</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </TableRow>
          </TableHead>
          <tbody>
            {this.state.posts.map(post => {
              return (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.userId}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.body}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.selectPost(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => this.deletePost(post.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
