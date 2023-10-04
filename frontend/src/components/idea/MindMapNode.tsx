import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "reactflow";
import { shallow } from "zustand/shallow";
import { ImCross } from "react-icons/im";
import useStore, { RFState } from "../../store";

export type NodeData = {
  label: string;
};

function MindMapNode({ id, data }: NodeProps<NodeData>) {
  const [inputValue, setInputValue] = useState(data.label); // state variable for input value
  const { setNodes, setEdges } = useReactFlow();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 입력 값 변경 시 inputValue 업데이트
  };

  const handleBlur = () => {
    if (inputValue.trim() !== "") {
      // If the input is not empty
      updateNodeLabel(id, inputValue); // Update the node label with the input value

      const updatedNode = nodes.find((node) => node.id === id);
      if (updatedNode) {
        setInputValue(updatedNode.data.label); // Reset the input value to the updated node label
      }
    }
  };

  const handleNodeClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);

  const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    addChildNode: state.addChildNode,
  });

  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode } = useStore(
    selector,
    shallow
  );

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  // DOM 업데이트 직후에 동기적으로 호출
  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${data.label.length * 8}px`;
    }
  }, [data.label.length]);

  return (
    <>
      <div onClick={handleNodeClick} className="inputWrapper">
        <div className="dragHandle">
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
          onClick={handleNodeClick}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className="input"
          ref={inputRef}
          defaultValue={data.label}
        />
        {id !== "root" ? (
          <div className="deleteBtn" onClick={deleteNode}>
            <ImCross size={10} color="#ffffff" />
          </div>
        ) : (
          <></>
        )}
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </>
  );
}

export default MindMapNode;
