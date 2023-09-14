import React, { useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { Handle, NodeProps, Position, useReactFlow, getIncomers, getOutgoers, getConnectedEdges } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { ImCross } from 'react-icons/im'

import useStore, { RFState } from '../../store';

export type NodeData = {
  label: string;
};

function MindMapNode({ id, data }: NodeProps<NodeData>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);

  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

  const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    addChildNode: state.addChildNode,
  });

  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode, } = useStore(selector, shallow);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);


  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${data.label.length * 8}px`;
    }
  }, [data.label.length]);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, 1);
  }, []);

  return (
    <>
      <div className="inputWrapper">
        <div className="dragHandle">
          {/* icon taken from grommet https://icons.grommet.io */}
          <svg viewBox="0 0 24 24">
            <path
              fill="#ffffff"
              stroke="#ffffff"
              strokeWidth="1"
              d="M15 5h2V3h-2v2zM7 5h2V3H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2z"
            />
          </svg>
        </div>
        <input
          value={data.label}
          onChange={(evt) => updateNodeLabel(id, evt.target.value)}
          className="input"
          ref={inputRef}
        />
        { id !== "root" ?
          <div className="deleteBtn" onClick={deleteNode}>
            <ImCross size={10} color='#ffffff'/>
          </div>
          :
          <></>
        }
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </>
  );
}

export default MindMapNode;
