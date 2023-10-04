import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition,
  DeleteElementsOptions,
} from "reactflow";
import { create } from "zustand";
import { nanoid } from "nanoid/non-secure";
import { getMindMap } from "./utils/mindmapApi";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addChildNode: (parentNode: Node, position: XYPosition) => void;
  deleteNode: (nodeId: string) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
  loadInitialData: (pjtId: string) => Promise<void>;
  reset: () => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: "root",
      type: "mindmap",
      data: { label: "프로젝트" },
      position: { x: 0, y: 0 },
      deletable: false,
      style: {},
    },
  ],

  edges: [],

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addChildNode: (parentNode: Node, position: XYPosition) => {
    const newNode = {
      id: nanoid(),
      type: "mindmap",
      data: { label: "새 아이디어" },
      position,
      // parentNode: parentNode.id,
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
    });
  },

  deleteNode: (nodeId: string) => {
    set({
      nodes: [...get().nodes.filter((node) => node.id !== nodeId)],
    });
  },

  updateNodeLabel: (nodeId: string, label: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, label };
        }
        return node;
      }),
    });
  },

  loadInitialData: async (pjtId: string) => {
    try {
      const response = await getMindMap(pjtId);
      const mindmapData = response.data.result[0];
      get().reset();
      const initialMindmapNodes = mindmapData.map((node: any) => ({
        id: node.id,
        type: "mindmap",
        data: { label: node.data.label },
        position: { x: node.position.x, y: node.position.y },
        deletable: !(node.id === "root"),
        style: {},
      }));

      const initialMindmapEdges = mindmapData
        .filter((node: any) => node.parentNode !== null)
        .map((node: any) => ({
          id: `${node.parentNode}_${node.id}`,
          source: node.parentNode,
          target: node.id,
        }));

      set({
        nodes: initialMindmapNodes,
        edges: initialMindmapEdges,
      });
    } catch (error) {
      console.error(error);
    }
  },
  reset: () =>
    set({
      nodes: [],
      edges: [],
      // 여기에 필요한 다른 초기화 로직 추가...
    }),
}));

export default useStore;
