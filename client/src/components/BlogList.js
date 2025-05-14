import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/BlogCard.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9002/api/blogs')
      .then((response) => {
        const blogsData = response.data.data.data;
        setBlogs(blogsData);
      })
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  const handleReadMore = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div className="blog-list">
      <h2 id="blogs" className="text-center font-bold text-2xl my-8">
        Recent Blogs
      </h2>
      <div className="blog-cards">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <button onClick={() => handleReadMore(blog._id)}>Read more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
