export interface IKanbanItem {
  id: string;
  content: string;
}

export interface IDragabbleCardProp {
  item: IKanbanItem;  
  index: number;
}