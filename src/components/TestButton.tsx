import React from 'react';

const TestButton: React.FC = () => {
  return (
    <button
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onClick={() => alert('Button clicked!')}
    >
      Click Me!
    </button>
  );
};

export default TestButton;