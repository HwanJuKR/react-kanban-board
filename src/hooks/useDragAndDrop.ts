import { DropResult } from "@hello-pangea/dnd";
import { IKanbanItem, IStatus } from "../interfaces/kanban.interface";

export const useDragAndDrop = (
  kanbanItem: Record<IStatus, IKanbanItem[]>,
  mutate: (data: any, shouldRevalidate?: boolean) => void,
  fetchItem: () => Record<IStatus, IKanbanItem[]>
) => {
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    const isValidStatus = (status: string): status is IStatus => {
      return ["toDo", "inProgress", "done"].includes(status);
    };

    if (
      isValidStatus(source.droppableId) &&
      isValidStatus(destination.droppableId)
    ) {
      if (destination.droppableId === source.droppableId) {
        // 같은 상태에서 위치 변경
        const itemList = [...kanbanItem[source.droppableId]];
        const moveItem = itemList[source.index];
        itemList.splice(source.index, 1);
        itemList.splice(destination.index, 0, moveItem);
        localStorage.setItem(source.droppableId, JSON.stringify(itemList));
      } else {
        // 다른 상태로 이동
        const sourceList = [...kanbanItem[source.droppableId]];
        const destinationList = [...kanbanItem[destination.droppableId]];
        const moveItem = sourceList[source.index];
        sourceList.splice(source.index, 1);
        destinationList.splice(destination.index, 0, moveItem);
        moveItem.status = destination.droppableId;
        localStorage.setItem(source.droppableId, JSON.stringify(sourceList));
        localStorage.setItem(
          destination.droppableId,
          JSON.stringify(destinationList)
        );
      }

      mutate(fetchItem(), false);
    }
  };

  return { onDragEnd };
};
