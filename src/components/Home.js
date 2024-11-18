import React from 'react';
import './Home.css';

const Home = () => {
  const links = [
    { name: "Array Visualizer", path: "https://structlens.netlify.app/array" },
    { name: "Linkedlist Visualizer", path: "https://structlens.netlify.app/linkedlist" },
    { name: "Stack Visualizer", path: "https://structlens.netlify.app/stack" },
    { name: "Queue Visualizer", path: "https://structlens.netlify.app/queue" },
    { name: "Tree Visualizer", path: "https://structlens.netlify.app/tree" },
    { name: "Graph Visualizer", path: "https://structlens.netlify.app/graph" },
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
