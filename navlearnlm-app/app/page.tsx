// "use client";

// import React, { useState } from "react";
// import styles from "./page.module.css";

// export default function UploadPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [status, setStatus] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const uploadPDF = async () => {
//     if (!file) {
//       setStatus("Please select a PDF file first.");
//       return;
//     }
//     console.log(file)

//     try {
//       setStatus("Uploading...")

//       const fileBlob = file
//       const response = await fetch("/api/process-pdf", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/pdf",
//         },
//         body: fileBlob,
//       })

//       if (response.ok) {
//         const result = await response.json()
//         setStatus(`Success: ${result.message}`)

//       } else {
//         const error = await response.json()
//         setStatus(`Error: ${error.error || "Something went wrong."}`)
//       }
//     } catch (err) {
//       setStatus(`Error: ${err}`)
//     } 
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.h1_}>Upload a PDF</h1>
//       <input className={styles.input_}
//         type="file"
//         accept="application/pdf"
//         onChange={handleFileChange}
//       />
//       <button className={styles.button_} onClick={uploadPDF}>Upload and Process</button>
//       {status && <p className={styles.p_} >{status}</p>}
//     </div>
//   );
// }

'use client'; // Required to use React state and hooks in Next.js
import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}