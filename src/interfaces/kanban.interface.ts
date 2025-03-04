export type IStatus = "toDo" | "inProgress" | "done";

export interface IKanbanItem {
  id: string;
  content: string;
  status: IStatus;
}

export interface IDragabbleCardProp {
  item: IKanbanItem;  
  index: number;
}