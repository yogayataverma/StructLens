import React, { useState } from 'react';
import './ArrayVisualizer.css';

const ArrayVisualizer = () => {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addElement = () => {
    if (inputValue.trim() !== '') {
      const newElement = Number(inputValue);
      setArray([...array, newElement]);
      setInputValue('');
    }
  };

  const removeElement = () => {
    if (array.length > 0) {
      setArray(array.slice(0, -1));
    }
  };

  return (
    <div className="visualizer-container">
      <h2 className="visualizer-title">Array Visualizer</h2>
      
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
        onClick={addElement}
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
        Add Element
      </button>
      <button
        onClick={removeElement}
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
        Remove Element
      </button>
    </div>


      <div className="array-scroll-container">
        <div className="array-content">
          {array.map((value, index) => (
            <div
              key={index}
              className="array-element"
            >
              <div className="element-value">{value}</div>
              <div className="element-index">Index: {index}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;