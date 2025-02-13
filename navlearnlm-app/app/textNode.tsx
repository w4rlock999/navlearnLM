import React, { memo, useState } from 'react';
import { Handle } from '@xyflow/react';

const TextNode = ({ data, isConnectable }) => {
  const [text, setText] = useState(data.text || '');

  const handleChange = (event) => {
    setText(event.target.value);
    if (data.onChange) {
      data.onChange(event.target.value);
    }
  };

  return (
    <div
      style={{
        padding: '10px',
        border: '1px solid lightgray',
        borderRadius: '5px',
        backgroundColor: 'white',
        textAlign: 'center',
        width: '150px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <textarea
        className="input" // Add the class for focus styles
        value={text}
        onChange={handleChange}
        rows={7}
        style={{
          border: '1px solid lightgray',
          borderRadius: '4px',
          padding: '5px',
          fontSize: '7px',
          width: '100%',
          resize: 'none',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          color: '#333',                           
        }}
      />
      {/* Custom scrollbar styles for webkit-based browsers */}
      <style>
        {`
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        textarea::-webkit-scrollbar-thumb {
          background-color: #e6e6e6;
          border-radius: 3px;
        }
        textarea::-webkit-scrollbar-thumb:hover {
          background-color: #cccccc;
        }
        textarea::-webkit-scrollbar-track {
          background-color: #ffffff;
          border-radius: 3px;
        }
        textarea:focus {
          outline-width: 2px; /* Example of a valid width */
          outline-color: rgb(150, 150, 150); /* Color remains unchanged */
        }
        `}
      </style>
      {/* Spacer for margin below text */}
      <div style={{ height: '20px' }}></div>
      {/* Input Handle */}
      <Handle
        type="target"
        position="left"
        isConnectable={isConnectable}
        id="input"
        style={{
          backgroundColor: 'black',
          height: '5px',
          width: '5px',
          position: 'absolute',
          left: '0px', 
          top: '89%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 'calc(89% - 6px)',
          left: '5px',
          fontSize: '8px',
          color: '#333',
        }}
      >
        In
      </div>
      {/* Output Handle */}
      <Handle
        type="source"
        position="right"
        isConnectable={isConnectable}
        id="output"
        style={{
          backgroundColor: 'black',
          height: '5px',
          width: '5px',
          position: 'absolute',
          right: '0px',
          top: '89%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 'calc(89% - 6px)',          
          right: '5px',
          fontSize: '8px',
          color: '#333',
        }}
      >
        Out
      </div>
    </div>
  );
};

export default memo(TextNode);
