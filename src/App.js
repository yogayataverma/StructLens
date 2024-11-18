import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArrayVisualizer from './components/ArrayVisualizer';
import LinkedListVisualizer from './components/LinkedListVisualizer';
import StackVisualizer from './components/StackVisualizer';
import QueueVisualizer from './components/QueueVisualizer';
import TreeVisualizer from './components/TreeVisualizer';
import GraphVisualizer from './components/GraphVisualizer';
import Home from './components/Home';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/array" element={<ArrayVisualizer />} />
          <Route path="/linkedlist" element={<LinkedListVisualizer />} />
          <Route path="/stack" element={<StackVisualizer />} />
          <Route path="/queue" element={<QueueVisualizer />} />
          <Route path="/tree" element={<TreeVisualizer />} />
          <Route path="/graph" element={<GraphVisualizer />} />
        </Routes>
    </Router>
  );
}

export default App;
