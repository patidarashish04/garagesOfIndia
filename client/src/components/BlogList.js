import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BlogCard.css'; // Import the CSS file for styling


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9002/api/blogs')
      .then((response) => {
        // Accessing the nested array of blogs
        const blogsData = response.data.data.data;
        setBlogs(blogsData);
      })
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div className="blog-list">
      <h2>Recent Blogs</h2>
      <div className="blog-cards">
        {blogs.map((blog, index) => (
        //   <div key={blog._id} className="blog-card">
            <div key={index} className="blog-card">
            <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
            <div className="blog-content">
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <button>Read more</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
