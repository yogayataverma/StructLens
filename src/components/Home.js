import React from 'react';
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
            <a href={link.path} className="link">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
