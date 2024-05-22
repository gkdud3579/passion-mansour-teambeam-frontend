"use client";

import React, { useState } from "react";
import LowerTodoList from "./LowerTodoList";
import { TodoItem } from "../types";
import { ToggleDownBtnIcon, ToggleUpBtnIcon } from "@/app/_components/Icons";

type Props = {
  task: TodoItem;
  onAddGoal: (type: string, middleTodoId?: string) => void;
};

const MiddleTodoList: React.FC<Props> = ({ task, onAddGoal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (!task) {
    return null;
  }

  return (
    <div className="middleTodoList">
      <div className="middleTodoHeader" onClick={toggleOpen}>
        <h4>{task.title}</h4>
        <div className="middleSide">
          <span className="middleDate">
            {task.startDate} - {task.endDate}
          </span>
          <div>
            {isOpen ? (
              <ToggleUpBtnIcon size={15} />
            ) : (
              <ToggleDownBtnIcon size={15} />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lowerTodoContainer">
          {(task.subtasks ?? []).map((subtask: TodoItem) => (
            <LowerTodoList key={subtask.id} subtask={subtask} />
          ))}
          <button
            className="lowAddSubtask"
            onClick={() => onAddGoal("하위 투두 추가 모달", task.id)}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default MiddleTodoList;
