'use client';
import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Agent 1' }, type: 'agent' },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Document 1' }, type: 'document' },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
let id = 3;
const getId = () => `${id++}`;

export default function Page() {
  return (
    <ReactFlowProvider>
      <FlowWithProvider />
    </ReactFlowProvider>
  );
}

function FlowWithProvider() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeType, setNodeType] = useState('agent');
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onConnectEnd = useCallback(
    (event, connectionState) => {

      if (!connectionState || !connectionState.fromNode) return;

      const { fromNode, toNode } = connectionState;

      // If `toNode` exists, don't add a new node or edge
      if (toNode) return;

      const { clientX, clientY } =
        'changedTouches' in event ? event.changedTouches[0] : event;

      // Create a new node at the drop position
      const newNode = {
        id: getId(),
        position: screenToFlowPosition({ x: clientX, y: clientY }),
        data: { label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node` },
        type: nodeType,
      };

      // Add the new node
      setNodes((nds) => nds.concat(newNode));

      // console.log(connectionState.fromHandle)

      if (connectionState.fromHandle.type === 'target') {
        // New edge
        const newEdge = {
          id: `e${connectionState.fromNode.id}-${newNode.id}`,
          source: newNode.id,
          target: connectionState.fromNode.id,
        };      
        setEdges((eds) => eds.concat(newEdge));

      }else if (connectionState.fromHandle.type === 'source'){
        // New edge
        const newEdge = {
          id: `e${connectionState.fromNode.id}-${newNode.id}`,
          source: connectionState.fromNode.id,
          target: newNode.id,
        };
        setEdges((eds) => eds.concat(newEdge));

      }


    },
    [nodeType, screenToFlowPosition, setNodes]
    
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
        <button onClick={() => setNodeType('agent')}>Agent</button>
        <button onClick={() => setNodeType('document')}>Document</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
        style={{ backgroundColor: '#F7F9FB' }}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
