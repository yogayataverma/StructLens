import React, { useState } from 'react';

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
    this.calculatePositions();
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  calculatePositions() {
    if (!this.root) return;

    let nodeCount = 0;
    const calculateInitialX = (node, depth = 0) => {
      if (!node) return;

      calculateInitialX(node.left, depth + 1);
      node.x = nodeCount++ * 60;
      node.y = depth * 60;
      calculateInitialX(node.right, depth + 1);
    };

    calculateInitialX(this.root);

    let minX = Infinity;
    let maxX = -Infinity;

    const adjustPositions = (node) => {
      if (!node) return;
      minX = Math.min(minX, node.x);
      maxX = Math.max(maxX, node.x);
      adjustPositions(node.left);
      adjustPositions(node.right);
    };

    adjustPositions(this.root);

    const offset = (maxX + minX) / 2;
    const centerTree = (node) => {
      if (!node) return;
      node.x -= offset;
      centerTree(node.left);
      centerTree(node.right);
    };

    centerTree(this.root);
  }

  // Depth First Search (DFS) - Inorder traversal
  dfsInOrder(node, visited = []) {
    if (!node) return visited;
    this.dfsInOrder(node.left, visited);
    visited.push(node.value);
    this.dfsInOrder(node.right, visited);
    return visited;
  }

  // Breadth First Search (BFS) - Level order traversal
  bfs() {
    if (!this.root) return [];
    let queue = [this.root];
    let result = [];
    while (queue.length > 0) {
      let node = queue.shift();
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }
}

const TreeNodeComponent = ({ node, lastInserted }) => {
  if (!node) return null;

  const isNewNode = node.value === lastInserted;

  return (
    <g>
      {node.left && (
        <line
          x1={node.x}
          y1={node.y}
          x2={node.left.x}
          y2={node.left.y}
          stroke="#666"
          strokeWidth="2"
        />
      )}
      {node.right && (
        <line
          x1={node.x}
          y1={node.y}
          x2={node.right.x}
          y2={node.right.y}
          stroke="#666"
          strokeWidth="2"
        />
      )}

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
        {node.value}
      </text>

      {node.left && <TreeNodeComponent node={node.left} lastInserted={lastInserted} />}
      {node.right && <TreeNodeComponent node={node.right} lastInserted={lastInserted} />}
    </g>
  );
};

const BinaryTreeVisualizer = () => {
  const [bst] = useState(new BinarySearchTree());
  const [inputValue, setInputValue] = useState('');
  const [lastInserted, setLastInserted] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [traversalResult, setTraversalResult] = useState([]);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      bst.insert(value);
      setInputValue('');
      setLastInserted(value);
      setUpdateTrigger(prev => prev + 1);
      setTimeout(() => setLastInserted(null), 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInsert();
    }
  };

  const handleDFS = () => {
    const result = bst.dfsInOrder(bst.root);
    setTraversalResult(result);
  };

  const handleBFS = () => {
    const result = bst.bfs();
    setTraversalResult(result);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6" style={{marginLeft:"35%", marginBottom:"10%"}}>
        <h2 className="text-2xl font-bold mb-4" style={{marginLeft:"6%"}}>Binary Search Tree Visualizer</h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8" style={{display:"flex", gap:"10px"}}>
        <input
          type="number"
          value={inputValue}
          style={{
            padding: '10px',
            borderRadius: '20px',
            border: '2px solid #3b82f6',
            outline: 'none',
            width: '200px',
            fontSize: '16px',
            transition: 'all 0.3s ease',
          }}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter value"
        />

        <button
          onClick={handleInsert}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Insert
        </button>

        <button
          onClick={handleDFS}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          DFS (In-Order)
        </button>

        <button
          onClick={handleBFS}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          BFS (Level Order)
        </button>

        </div>
        {traversalResult.length > 0 && (
          <div className="text-lg font-semibold">
            <p>Traversal Result: {traversalResult.join(', ')}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center w-full">
        <svg
          width="100%"
          height="500"
          viewBox="-300 -30 600 400"
          preserveAspectRatio="xMidYMid meet"
          className="mx-auto"
        >
          {bst.root && (
            <TreeNodeComponent
              node={bst.root}
              lastInserted={lastInserted}
            />
          )}
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

export default BinaryTreeVisualizer;
