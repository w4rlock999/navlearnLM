import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const GenericAgentNode = ({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div
        style={{
          padding: '10px',
          border: '1px solid #222',
          borderRadius: '5px',
          backgroundColor: '#e3f2fd',
          textAlign: 'center',
        }}
      >
        <strong>{data.label}</strong>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(GenericAgentNode);
