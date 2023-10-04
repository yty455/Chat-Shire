import React, { useCallback, useRef, useState, useEffect } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FloatButton, Popover } from "antd";
import { getMindMap, saveMindmap } from "../../utils/mindmapApi";

import ReactFlow, {
  Controls,
  OnConnectEnd,
  OnConnectStart,
  MiniMap,
  useStoreApi,
  Node,
  useReactFlow,
  ReactFlowProvider,
  NodeOrigin,
  ConnectionLineType,
  XYPosition,
} from "reactflow";

import { shallow } from "zustand/shallow";

import useStore, { RFState } from "../../store";
import MindMapNode from "./MindMapNode";
import MindMapEdge from "./MindMapEdge";
import "../../index.css";

// we need to import the React Flow styles to make it work
import "reactflow/dist/style.css";

interface IdeaProps {
  pjtId: string;
}

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
});

const nodeTypes = {
  mindmap: MindMapNode,
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: "#39A789", strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };
const minimapStyle = {
  height: 120,
};

function Flow({ pjtId }: IdeaProps) {
  const [mindmap, setMindmap] = useState([]);
  // whenever you use multiple values, you should use shallow for making sure that the component only re-renders when one of the values change
  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode } = useStore(
    selector,
    shallow
  );
  const loadInitialData = useStore((state) => state.loadInitialData);
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

  useEffect(() => {
    loadInitialData(pjtId);
  }, [pjtId]);

  const saveMindmapData = async () => {
    const transformedData: any[] = [];
    nodes.forEach((node) => {
      const parentNode = edges.find((edge) => edge.target === node.id);
      transformedData.push({
        id: node.id,
        data: {
          label: node.data.label || "defaultLabel",
        },
        position: {
          x: node.position.x || 0,
          y: node.position.y || 0,
        },
        parentNode: parentNode ? parentNode.source : "null",
      });
    });

    try {
      // 업데이트된 마인드맵 데이터를 서버에 저장
      await saveMindmap(pjtId, transformedData);
    } catch (error) {
      console.error("마인드맵 데이터 저장 실패:", error);
      // 저장 실패 시 예외 처리 로직 추가
    }
  };

  const connectingNodeId = useRef<string | null>(null);
  const store = useStoreApi();
  const { project } = useReactFlow();

  const getChildNodePosition = (event: MouseEvent, parentNode?: Node) => {
    const { domNode } = store.getState();

    if (
      !domNode ||
      // we need to check if these properites exist, because when a node is not initialized yet,
      // it doesn't have a positionAbsolute nor a width or height
      !parentNode?.positionAbsolute ||
      !parentNode?.width ||
      !parentNode?.height
    ) {
      return;
    }

    const { top, left } = domNode.getBoundingClientRect();

    // we need to remove the wrapper bounds, in order to get the correct mouse position
    const panePosition = project({
      x: event.clientX - left,
      y: event.clientY - top,
    });

    // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
    return {
      x: panePosition.x,
      y: panePosition.y,
    };
  };

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd: OnConnectEnd = useCallback(
    (event) => {
      const { nodeInternals } = store.getState();
      const targetIsPane = (event.target as Element).classList.contains(
        "react-flow__pane"
      );
      const node = (event.target as Element).closest(".react-flow__node");

      if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeInternals.get(connectingNodeId.current);
        let childNodePosition: XYPosition | undefined;

        if (event instanceof MouseEvent) {
          console.log(childNodePosition);
          childNodePosition = getChildNodePosition(event, parentNode);
        }
        if (parentNode && childNodePosition) {
          console.log(event);
          addChildNode(parentNode, childNodePosition);
        }
      }
    },
    [getChildNodePosition]
  );

  // 가이드
  const content = (
    <div>
      <p style={{ margin: 0, fontFamily: "preRg" }}>
        각 노드의 왼쪽 점을 눌러 내용을 편집하고 위치를 옮겨보세요.
      </p>
      <p style={{ margin: 0, fontFamily: "preRg" }}>
        드래그 앤 드롭으로 새 노드를 생성하세요.
      </p>
    </div>
  );

  return (
    <div
      style={{ backgroundColor: "#ffffff", width: "52vw", height: "74.7vh" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        connectionLineStyle={connectionLineStyle}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.Straight}
        nodeOrigin={nodeOrigin}
        fitView
      >
        <Controls showInteractive={false} />
        <MiniMap style={minimapStyle} zoomable pannable />
        <Popover placement="right" content={content} trigger="hover">
          <FloatButton
            icon={<QuestionCircleOutlined />}
            type="default"
            style={{ width: 22, height: 20, bottom: 540, left: 310 }}
          />
        </Popover>
        <button onClick={saveMindmapData}>저장</button>
      </ReactFlow>
    </div>
  );
}

export default ({ pjtId }: IdeaProps) => (
  <ReactFlowProvider>
    <Flow pjtId={pjtId} />
  </ReactFlowProvider>
);
