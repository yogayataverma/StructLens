import React, { useState } from 'react';
import './QueueVisualizer.css';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const enqueue = () => {
    if (inputValue.trim() !== '') {
      const newElement = Number(inputValue);
      setQueue([...queue, newElement]);
      setInputValue('');
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1));
    }
  };

  return (
    <div className="visualizer-container">
      <h2 className="visualizer-title">Queue Visualizer</h2>

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
        onClick={enqueue}
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
        Enqueue
      </button>
      <button
        onClick={dequeue}
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
        Dequeue
      </button>
    </div>


      <div className="queue-scroll-container">
        <div className="queue-content">
          {queue.map((value, index) => (
            <div key={index} className="queue-element">
              {index === 0 && <div className="pointer">Front</div>}
              <div className="element-value">{value}</div>
              {index === queue.length - 1 && <div className="pointer">Rear</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
