import React, { useState } from 'react';
import './LinkedListVisualizer.css';

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Add node at the end
  addNode(value) {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    return newNode;
  }

  // Insert node at the beginning
  insertAtBeginning(value) {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    return newNode;
  }

  // Delete a node by value
  deleteNode(value) {
    if (!this.head) return null; // List is empty

    // If the head node needs to be removed
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    // If node with the given value is found
    if (current.next) {
      current.next = current.next.next;
    }
  }

  // Delete node from the beginning
  deleteFromBeginning() {
    if (!this.head) return; // List is empty
    this.head = this.head.next;
  }

  // Delete node from the end
  deleteFromEnd() {
    if (!this.head) return; // List is empty

    // If there's only one node in the list
    if (!this.head.next) {
      this.head = null;
      return;
    }

    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }
    current.next = null;
  }

  // Get all nodes as an array
  getNodes() {
    const nodes = [];
    let current = this.head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  }
}

const LinkedListVisualizer = () => {
  const [linkedList] = useState(new LinkedList());
  const [nodes, setNodes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Add node at the end
  const addNode = () => {
    if (inputValue.trim() === '') return;
    linkedList.addNode(inputValue);
    setInputValue('');
    setNodes(linkedList.getNodes());
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  // Insert node at the beginning
  const insertAtBeginning = () => {
    if (inputValue.trim() === '') return;
    linkedList.insertAtBeginning(inputValue);
    setInputValue('');
    setNodes(linkedList.getNodes());
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  // Delete node by value
  const deleteNode = () => {
    if (inputValue.trim() === '') return;
    linkedList.deleteNode(inputValue);
    setInputValue('');
    setNodes(linkedList.getNodes());
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  // Delete node from the beginning
  const deleteFromBeginning = () => {
    linkedList.deleteFromBeginning();
    setNodes(linkedList.getNodes());
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  // Delete node from the end
  const deleteFromEnd = () => {
    linkedList.deleteFromEnd();
    setNodes(linkedList.getNodes());
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="linked-list-visualizer">
      <h2>Linked List Visualizer</h2>
      <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter node value"
        style={{
          padding: '10px',
          borderRadius: '20px',
          border: '2px solid #3b82f6',
          outline: 'none',
          width: '200px',
          fontSize: '16px',
        }}
      />
      <button
        onClick={addNode}
        style={{
          padding: '10px 15px',
          borderRadius: '20px',
          border: 'none',
          backgroundColor: '#3b82f6',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          margin: '5px',
        }}
      >
        Add Node to End
      </button>
      <button
        onClick={insertAtBeginning}
        style={{
          padding: '10px 15px',
          borderRadius: '20px',
          border: 'none',
          backgroundColor: '#3b82f6',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          margin: '5px',
        }}
      >
        Insert Node at Beginning
      </button>
      <button
        onClick={deleteNode}
        style={{
          padding: '10px 15px',
          borderRadius: '20px',
          border: 'none',
          backgroundColor: '#3b82f6',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          margin: '5px',
        }}
      >
        Delete Node by Value
      </button>
      <button
        onClick={deleteFromBeginning}
        style={{
          padding: '10px 15px',
          borderRadius: '20px',
          border: 'none',
          backgroundColor: '#3b82f6',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          margin: '5px',
        }}
      >
        Delete Node from Beginning
      </button>
      <button
        onClick={deleteFromEnd}
        style={{
          padding: '10px 15px',
          borderRadius: '20px',
          border: 'none',
          backgroundColor: '#3b82f6',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          margin: '5px',
        }}
      >
        Delete Node from End
      </button>
    </div>

      <div className="linked-list-container">
        {nodes.map((node, index) => (
          <div className="list-node-container" key={index}>
            <div
              className={`list-node ${animate ? 'node-animate' : ''}`}
            >
              <div className="node-value">{node.value}</div>
            </div>
            <div className="node-link">
              {index === nodes.length - 1 ? '→ null' : '→'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
