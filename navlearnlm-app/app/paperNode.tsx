import React, { memo, useState } from 'react';
import { Handle } from '@xyflow/react';
import { useMemo } from "react";
import YooptaEditor, { createYooptaEditor, YooptaContentValue, YooptaOnChangeOptions } from "@yoopta/editor";
// import Paragraph from "@yoopta/paragraph";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";



const PaperNode = ({ data, isConnectable }) => {
  const [text, setText] = useState(data.text || '');
  const editor = useCreateBlockNote();

  return(
    <div
      style={{
        padding: '10px',
        background: 'yellow',
        marginLeft: '100px',
        height: '150px'
      }}
    >          
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
      <BlockNoteView editor={editor} />
    </div>  
  )
}

export default memo(PaperNode);