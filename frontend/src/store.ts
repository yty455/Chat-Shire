import { Edge, EdgeChange, Node, NodeChange, OnNodesChange, OnEdgesChange, applyNodeChanges, applyEdgeChanges, XYPosition } from 'reactflow';
import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addChildNode: (parentNode: Node, position: XYPosition) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: 'root',
      type: 'mindmap',
      data: { label: 'Project' },
      position: { x: 0, y: 0 },
      style: { display: "flex", justifyContent: "center", alignItems: "center", width: 80, height: 30, borderRadius: 20, backgroundColor: "#39A789", color: "#ffffff" }
    },
  ],
  edges: [
    {
      id: 'r-1',
      source: 'root',
      target: '1',
    },
    {
      id: '1-1',
      source: '1',
      target: '1-1',
    },
    {
      id: '1-2',
      source: '1',
      target: '1-2',
    },
    {
      id: 'r-2',
      source: 'root',
      target: '2',
    },
    {
      id: '2-1',
      source: '2',
      target: '2-1',
    },
    {
      id: '2-2',
      source: '2',
      target: '2-2',
    },
    {
      id: 'r-3',
      source: 'root',
      target: '3',
    },
    {
      id: '3-1',
      source: '3',
      target: '3-1',
    },
  ],
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
      type: 'mindmap',
      data: { label: 'New Node' },
      position,
      parentNode: parentNode.id,
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
}));

export default useStore;
