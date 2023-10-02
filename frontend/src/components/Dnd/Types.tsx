interface ItemState {
  id: number;
  taskGroupId: number;
  description: string;
  progress: string;
}

export interface ColumnProps {
  children: JSX.Element[];
  className: string;
  title: string;
}
