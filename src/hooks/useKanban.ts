import { useState } from "react";
import useSWR from "swr";
import {
  IKanbanData,
  IKanbanItem,
  IStatus,
} from "../interfaces/kanban.interface";
import { useDragAndDrop } from "./useDragAndDrop";

const EMPTY_KANBAN_DATA: IKanbanData = { toDo: [], inProgress: [], done: [] };

const fetchItem = (): IKanbanData => {
  try {
    return {
      toDo: JSON.parse(localStorage.getItem("toDo") ?? "[]"),
      inProgress: JSON.parse(localStorage.getItem("inProgress") ?? "[]"),
      done: JSON.parse(localStorage.getItem("done") ?? "[]"),
    };
  } catch (error) {
    alert("저장된 데이터를 불러오는 데 실패햿습니다. 잠시 후 다시 시도해 주세요");
    return EMPTY_KANBAN_DATA;
  }
};

export const useKanban = () => {
  const { data: kanbanItem = EMPTY_KANBAN_DATA, mutate } = useSWR(
    "kanbanItem",
    fetchItem
  );
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>("");
  const [newStatus, setNewStatus] = useState<IStatus>("toDo");
  const { onDragEnd } = useDragAndDrop(kanbanItem, mutate, fetchItem);

  const handlePopupOpen = () => {
    setIsPopup(true);
  };

  const handlePopupClose = () => {
    setIsPopup(false);
  };

  const handleAllDel = () => {
    const confirm = window.confirm("전체 리스트를 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      ["toDo", "inProgress", "done"].forEach((status) =>
        localStorage.removeItem(status)
      );
      mutate(EMPTY_KANBAN_DATA, false);
    } catch (error) {
      alert("삭제 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요");
    }
  };

  const handleAddItem = () => {
    if (!newItem.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const newItemData: IKanbanItem = {
        id: `${Date.now()}`,
        content: newItem,
        status: newStatus,
      };

      const updatedItems = [...kanbanItem[newStatus], newItemData];
      localStorage.setItem(newStatus, JSON.stringify(updatedItems));

      mutate(fetchItem(), false);
      setNewItem("");
      setNewStatus("toDo");
      setIsPopup(false);
    } catch (error) {
      alert("항목 추가 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요");
    }
  };

  const handleDelItem = (id: string, status: IStatus) => {
    const confirm = window.confirm("항목을 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      const updatedItem = {
        ...kanbanItem,
        [status]: kanbanItem[status].filter((item) => item.id !== id),
      };
  
      localStorage.setItem(status, JSON.stringify(updatedItem[status]));
      mutate(updatedItem, false);
    } catch (error) {
      alert("항목 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요");
    }
  };

  return {
    isPopup,
    newItem,
    newStatus,
    statusItem: kanbanItem,
    onDragEnd,
    handlePopupOpen,
    handlePopupClose,
    handleAllDel,
    handleAddItem,
    handleDelItem,
    setNewItem,
    setNewStatus,
  };
};
