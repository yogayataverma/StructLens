import React, { useState } from 'react';
import './StackVisualizer.css';

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const pushElement = () => {
    if (inputValue.trim() !== '') {
      const newElement = Number(inputValue);
      setStack([...stack, newElement]);
      setInputValue('');
    }
  };

  const popElement = () => {
    if (stack.length > 0) {
      setStack(stack.slice(0, -1));
    }
  };

  return (
    <div className="visualizer-container">
      <h2 className="visualizer-title">Stack Visualizer</h2>
      
      <div className="controls-container" style={{ display: 'flex', gap: '10px', marginTop: '1%' }}>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a number"
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
        onClick={pushElement}
        style={{
          padding: '10px 15px',
          borderRadius: '20px',
          border: 'none',
          backgroundColor: '#3b82f6',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Push
      </button>
      <button
        onClick={popElement}
        style={{
          padding: '10px 15px',
          borderRadius: '20px',
          border: 'none',
          backgroundColor: '#3b82f6',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Pop
      </button>
    </div>


      <div className="stack-container">
        <div className="stack-content">
          {[...stack].reverse().map((value, index) => (
            <div
              key={index}
              className="stack-element"
            >
              <div className="element-value">{value}</div>
              <div className="element-index">Index: {stack.length - 1 - index}</div>
              {index === 0 && (
                <div className="top-arrow">↑</div>
              )}
            </div>
          ))}
          
          {stack.length > 0 && (
            <div className="bottom-indicator">-1</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;