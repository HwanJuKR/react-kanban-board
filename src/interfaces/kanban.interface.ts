import { DropResult } from "@hello-pangea/dnd";

export type IStatus = "toDo" | "inProgress" | "done";

export interface ITitleProps {
  onAddClick: () => void;
  onDelClick: () => void;
}

export interface IBoardProps {
  statusItem: Record<IStatus, IKanbanItem[]>;
  onDragEnd: (result: DropResult) => void;
  handleDelItem: (id: string, status: IStatus) => void;
}

export interface IBoardContentProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

export interface IKanbanItem {
  id: string;
  content: string;
  status: IStatus;
}

export interface ICardProps {
  item: IKanbanItem;
  index: number;
  deleteCard: (id: string, status: IStatus) => void;
}

export interface IPopupProps {
  newStatus: string;
  newItem: string;
  handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleAddItem: () => void;
  handlePopupClose: () => void;
}
