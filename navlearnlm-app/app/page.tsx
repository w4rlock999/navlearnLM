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
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import genericAgentNode from './genericAgentNode'; // Import the custom node
import textNode from "./textNode"

const flowKey = 'example-flow';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Default Agent' }, type: 'genericAgent' },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Text Node', text: 'This is a prompt text for LLM' }, type: 'text' },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

let id = 3;
const getId = () => `${id++}`;

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeType, setNodeType] = useState('agent');
  const { screenToFlowPosition } = useReactFlow();
  const [rfInstance, setRfInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onConnectEnd = useCallback(
    (event, connectionState) => {
      if (!connectionState || !connectionState.fromNode) return;

      const { fromNode, toNode } = connectionState;

      if (toNode) return;

      const { clientX, clientY } =
        'changedTouches' in event ? event.changedTouches[0] : event;

      const newNode = {
        id: getId(),
        position: screenToFlowPosition({ x: clientX, y: clientY }),
        data: { label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node` },
        type: nodeType,
      };

      setNodes((nds) => nds.concat(newNode));

      const newEdge = connectionState.fromHandle.type === 'target'
        ? { id: `e${newNode.id}-${fromNode.id}`, source: newNode.id, target: fromNode.id }
        : { id: `e${fromNode.id}-${newNode.id}`, source: fromNode.id, target: newNode.id };

      setEdges((eds) => eds.concat(newEdge));
    },
    [nodeType, screenToFlowPosition, setNodes]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(flow)
      // localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>          
        <button
          onClick={() => setNodeType('agent')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          Agent
        </button>
        <button
          onClick={() => setNodeType('document')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:ring-2 focus:ring-green-300"
        >
          Document
        </button>
        <button
          onClick={() => setNodeType('genericAgent')}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 focus:ring-2 focus:ring-purple-300"
        >
          Generic Agent
        </button>
        <button
          onClick={() => setNodeType('text')}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-red-600 focus:ring-2 focus:ring-purple-300"
        >
          text
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        onConnectEnd={onConnectEnd}
        fitView
        nodeTypes={{ genericAgent: genericAgentNode, text: textNode}} // Register custom node type
        style={{ backgroundColor: '#F7F9FB' }}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />

        <Panel position="top-right">
          <button onClick={onSave}>save</button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default function Page() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}