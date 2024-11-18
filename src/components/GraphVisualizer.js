import React, { useState } from 'react';

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [edgeInput, setEdgeInput] = useState('');
  const [lastInserted, setLastInserted] = useState(null);

  // Function to add a new node with random positioning
  const addNode = () => {
    const value = inputValue.trim();
    if (!value) return;

    // Ensure unique labels
    if (nodes.some(node => node.label === value)) {
      alert('Node with this label already exists!');
      return;
    }

    const newNode = {
      label: value,
      x: Math.random() * 500 - 250, // Spread nodes across the SVG
      y: Math.random() * 300 - 150
    };

    setNodes(prevNodes => [...prevNodes, newNode]);

    setLastInserted(value);
    setInputValue('');
    setTimeout(() => setLastInserted(null), 500);
  };

  // Function to add an edge based on labels
  const addEdge = () => {
    const [fromLabel, toLabel] = edgeInput.split(',').map(label => label.trim());
    const fromNodeIndex = nodes.findIndex(node => node.label === fromLabel);
    const toNodeIndex = nodes.findIndex(node => node.label === toLabel);

    if (fromNodeIndex !== -1 && toNodeIndex !== -1 && fromNodeIndex !== toNodeIndex) {
      // Prevent duplicate edges
      if (!edges.some(edge => 
        (edge.from === fromNodeIndex && edge.to === toNodeIndex) ||
        (edge.from === toNodeIndex && edge.to === fromNodeIndex)
      )) {
        setEdges(prevEdges => [...prevEdges, { from: fromNodeIndex, to: toNodeIndex }]);
      }
    }

    setEdgeInput('');
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6" style={{marginLeft:"35%", marginBottom:"10%"}}>
        <h2 className="text-2xl font-bold mb-4" style={{marginLeft:"6%"}}>Graph Visualizer</h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <input
            type="text"
            value={inputValue}
            style={{border:"2px solid #3b82f6", marginRight:"10px" , borderRadius:"20px"}}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addNode)}
            className="border rounded px-3 py-2 w-40 text-center"
            placeholder="Enter node label"
          />
          <button
            onClick={addNode}
            style={{background:"#3b82f6", color:"white",border:"2px solid #3b82f6", borderRadius:"20px"}}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Node
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <input
            type="text"
            value={edgeInput}
            style={{border:"2px solid #3b82f6", marginRight:"10px", borderRadius:"20px"}}
            onChange={(e) => setEdgeInput(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addEdge)}
            className="border rounded px-3 py-2 w-40 text-center"
            placeholder="From, To"
          />
          <button
            onClick={addEdge}
            style={{background:"#3b82f6", color:"white",border:"2px solid #3b82f6", borderRadius:"20px"}}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Add Edge
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <svg
          width="100%"
          height="500"
          viewBox="-300 -250 600 500"
          preserveAspectRatio="xMidYMid meet"
          className="mx-auto"
          style={{marginTop:"-12%"}}
        >
          {/* Draw edges */}
          {edges.map((edge, index) => {
            const fromNode = nodes[edge.from];
            const toNode = nodes[edge.to];
            return (
              <line
                key={index}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#666"
                strokeWidth="2"
              />
            );
          })}

          {/* Draw nodes */}
          {nodes.map((node, index) => {
            const isNewNode = node.label === lastInserted;
            return (
              <g key={index}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill="white"
                  stroke={isNewNode ? '#4CAF50' : '#1a73e8'}
                  strokeWidth="2"
                  className={isNewNode ? 'node-animate' : ''}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy=".3em"
                  fontSize="14"
                  fill="#333"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <style>{`
        @keyframes nodeInsert {
          0% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .node-animate {
          animation: nodeInsert 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GraphVisualizer;