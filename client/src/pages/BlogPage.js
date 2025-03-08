import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BlogsPage.css";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs
  useEffect(() => {
    axios
      .get("http://localhost:9002/api/blogs")
      .then((res) => {
        let result = res.data.data.data;
        console.log('====>>>>',result)
        setBlogs(result);
      }) // Adjusted based on response
      .catch((err) => console.error(err));
  }, []);

  // Delete a blogs
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9002/api/blogs/${id}`)
      .then(() => {
        setBlogs(blogs.filter((blogs) => blogs._id !== id)); // Update state after deletion
        alert("Blog deleted successfully.");
      })
      .catch((err) => console.error(err));
  };

  // Add a blogs (simplified, should ideally show a form modal)
  const handleAdd = () => {
    const newlog = {
      title: "New Blog",
      description: "A newly added blogs.",
      imageUrl: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNpHHexZEaEdqjOYor55zJw2AdMRW1T745dA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNpHHexZEaEdqjOYor55zJw2AdMRW1T745dA&s"],
    };
    axios
      .post("http://localhost:9002/api/blogs", newlog)
      .then((res) => {
        setBlogs([...blogs, res.data.data]); // Add the new blogs to state
        alert("Blog added successfully.");
      })
      .catch((err) => console.error(err));
  };

  // Update a blogs (simplified, should ideally show a form modal)
  const handleUpdate = (id) => {
    const updatedBlog = {
      title: "Updated Blogs",
      description: "This blogs has been updated.",
      imageUrl: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNpHHexZEaEdqjOYor55zJw2AdMRW1T745dA&s"
    ],
    };
    axios
      .patch(`http://localhost:9002/api/blogs/${id}`, updatedBlog)
      .then(() => {
        setBlogs(
          blogs.map((blogs) =>
            blogs._id === id ? { ...blogs, ...updatedBlog } : blogs
          )
        ); // Update the state with the updated blogs
        alert("Blog updated successfully.");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Blogs List</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Blog
        </button>
      </div>
      {blogs.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Photos</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blogs, index) => (
              <tr key={blogs._id}>
                <td>{index+1}</td>
                <td>{blogs.title}</td>
                <td>{blogs.description}</td>
                <td>
                  {blogs.imageUrl.length > 0 ? (
                    blogs.imageUrl.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Garage ${index + 1}`}
                        className="img-thumbnail me-2"
                        style={{ width: "60px", height: "60px" }}
                      />
                    ))
                  ) : (
                    <span>No photos</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleUpdate(blogs._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(blogs._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info">No blogs found.</div>
      )}
    </div>
  );
};

export default BlogsPage;
