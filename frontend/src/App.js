import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [blogPosts, setBlogPosts] = useState([]);

  const handleGetAllPosts = () => {
    console.log("Button Clicked");
    fetch('http://localhost:5000/api/v1/blog/getAllBlogPosts', {method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
      .then((data) => data = data.json())
      .then((data) => {
        console.log(data);
        setBlogPosts(data[1].output);
      })
  }

  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogConfirmation, setBlogConfirmation] = useState("");

  const handleTitleChange = (e) => {
    setBlogTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setBlogDescription(e.target.value);
  }

  const handleAuthorChange = (e) => {
    setBlogAuthor(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(blogTitle);
    console.log(blogDescription);
    console.log(blogAuthor);

    const body = {};
    body.title = blogTitle;
    body.description = blogDescription;
    body.author = blogAuthor;

    fetch('http://localhost:5000/api/v1/blog/createBlogPost', {method: 'POST', body: JSON.stringify(body),  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
      .then((data) => data = data.json())
      .then((data) => {
        console.log(data);
        setBlogConfirmation(data[0].msg);
      })
  }

  const handleDelete = (e) => {
    console.log(e.target.id);
    const body = {};
    body.author = e.target.id;

    fetch('http://localhost:5000/api/v1/blog/deleteBlogPost', {method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
      .then((data) => data = data.json())
      .then((data) => {
        console.log(data);
        handleGetAllPosts();
      })
  }

  return (
    <div className="App">
      <button onClick={handleGetAllPosts}>Get All Blog Posts</button>
      <h3>All Blog Posts</h3>
      {
        blogPosts.map((v, i) => {
          return (
            <>
              <div key={i}>
                Title: {v.title}<br />
                Description: {v.description}<br />
                Author: {v.author}<br />
                <button onClick={handleDelete} id={v.author}>Delete</button>
              </div>
              <hr />
            </>
          )
        })
      }

      <hr />
      <h3>Create Blog Post</h3>
      <form>
        Title: <input type="text" name="title" onChange={handleTitleChange} /><br />
        Description: <input type="text" name="description" onChange={handleDescriptionChange} /><br />
        Author: <input type="text" name="author" onChange={handleAuthorChange} /><br />
        <input type="submit" onClick={handleSubmit} />
      </form>
      {blogConfirmation}
    </div>
  );
}

export default App;
