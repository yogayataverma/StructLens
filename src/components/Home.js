import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Home.css';

const Home = () => {
  const links = [
    { name: "Array Visualizer", path: "/array" },
    { name: "Linkedlist Visualizer", path: "/linkedlist" },
    { name: "Stack Visualizer", path: "/stack" },
    { name: "Queue Visualizer", path: "/queue" },
    { name: "Tree Visualizer", path: "/tree" },
    { name: "Graph Visualizer", path: "/graph" },
  ];

  return (
    <div className="home-container">
      <h1>Welcome to the Algorithm Visualizer</h1>
      <ul className="link-list">
        {links.map((link, index) => (
          <li key={index} className="link-item">
            <Link to={link.path} className="link">  {/* Use Link here */}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
