import { DropResult } from "@hello-pangea/dnd";
import { IKanbanData, IStatus } from "../interfaces/kanban.interface";

export const useDragAndDrop = (
  kanbanItem: IKanbanData,
  mutate: (data: IKanbanData, shouldRevalidate?: boolean) => void,
  fetchItem: () => IKanbanData
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
      try {
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
      } catch (error) {
        alert("항목 위치 변경에 실패했습니다. 잠시 후 다시 시도해 주세요");
        mutate(fetchItem(), false);
      }
    }
  };

  return { onDragEnd };
};
