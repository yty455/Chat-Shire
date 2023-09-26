export interface ItemState {
  id: number;
  name: string;
  column: string;
}

export interface ColumnProps {
  children: JSX.Element[];
  className: string;
  title: string;
}