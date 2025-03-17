export type IStatus = "toDo" | "inProgress" | "done";

export interface IBoardProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

export interface IKanbanItem {
  id: string;
  content: string;
  status: IStatus;
}

export interface IDragabbleCardProps {
  item: IKanbanItem;  
  index: number;
  deleteCard: (id: string, status: IStatus) => void;
}