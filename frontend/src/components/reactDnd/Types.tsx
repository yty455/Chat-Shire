export interface ItemState {
  id: number;
  githubId: string;
  nickname: string; 
  position: string;
  profileColor: string;
  profileImage: string;
  column: string;
}

export interface ColumnProps {
  children: JSX.Element[];
  className: string;
  title: string;
}