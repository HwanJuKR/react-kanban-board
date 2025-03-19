import { useMemo, useState } from "react";
import useSWR from "swr";
import { IKanbanItem, IStatus } from "../interfaces/kanban.interface";
import { useDragAndDrop } from "./useDragAndDrop";

const fetchItem = (): {
  toDo: IKanbanItem[];
  inProgress: IKanbanItem[];
  done: IKanbanItem[];
} => {
  return {
    toDo: JSON.parse(localStorage.getItem("toDo") ?? "[]"),
    inProgress: JSON.parse(localStorage.getItem("inProgress") ?? "[]"),
    done: JSON.parse(localStorage.getItem("done") ?? "[]"),
  };
};

export const useKanban = () => {
  const { data: kanbanItem = { toDo: [], inProgress: [], done: [] }, mutate } =
    useSWR("kanbanItem", fetchItem);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>("");
  const [newStatus, setNewStatus] = useState<IStatus>("toDo");
  const statusItem = useMemo(() => kanbanItem, [kanbanItem]);
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

    ["toDo", "inProgress", "done"].forEach((status) =>
      localStorage.removeItem(status)
    );
    mutate({ toDo: [], inProgress: [], done: [] }, false);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
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
    }
  };

  const handleDelItem = (id: string, status: IStatus) => {
    console.log(kanbanItem[status]);
    const confirm = window.confirm("항목을 삭제하시겠습니까?");
    if (!confirm) return;

    const updatedItem = {
      ...kanbanItem,
      [status]: kanbanItem[status].filter((item) => item.id !== id),
    };

    console.log(updatedItem);

    localStorage.setItem(status, JSON.stringify(updatedItem[status]));

    mutate(updatedItem, false);
  };

  return {
    isPopup,
    newItem,
    newStatus,
    statusItem,
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
