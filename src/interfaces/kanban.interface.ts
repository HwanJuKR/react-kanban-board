import { DropResult } from "@hello-pangea/dnd";

export type IStatus = "toDo" | "inProgress" | "done";

export interface ITitleProps {
  onAdd: () => void;
  onDelete: () => void;
}

export interface IBoardContentProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
  id?: IStatus;
}

export interface IKanbanItem {
  id: string;
  content: string;
  status: IStatus;
}

export interface IKanbanData {
  toDo: IKanbanItem[];
  inProgress: IKanbanItem[];
  done: IKanbanItem[];
}

export interface IBoardProps {
  statusItem: IKanbanData;
  onDragEnd: (result: DropResult) => void;
  onDelItem: (id: string, status: IStatus) => void;
}

export interface ICardProps {
  item: IKanbanItem;
  index: number;
  onDelete: (id: string, status: IStatus) => void;
}

export interface IPopupProps {
  newStatus: IStatus;
  newItem: string;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddItem: () => void;
  onPopupClose: () => void;
}

export interface IColumnColorParams {
  status: IStatus;
  isDraggingOver: boolean;
}

export interface IColumnColor {
  background: string;
  title: string;
}

export interface IStatusColor {
  toDo: IColumnColor;
  inProgress: IColumnColor;
  done: IColumnColor;
}
