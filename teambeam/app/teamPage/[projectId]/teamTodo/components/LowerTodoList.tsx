import React from "react";
import { TodoItem, Participant } from "../types";

type Props = {
  subtask: TodoItem;
  onStatusChange: (id: string, newStatus: boolean) => void;
  participants: Participant[];
};

const LowerTodoList: React.FC<Props> = ({
  subtask,
  onStatusChange,
  participants,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (subtask.bottomTodoId) {
      onStatusChange(subtask.bottomTodoId, !e.target.checked);
    }
  };

  const getAssigneeName = (id: string) => {
    const participant = participants.find((p) => p.id.toString() === id);
    return participant ? participant.name : id;
  };

  return (
    <div className="lowerTodoList">
      <div>
        <input
          type="checkbox"
          checked={!subtask.status}
          onChange={handleStatusChange}
        />
        <h5 className="lowerTitle">{subtask.title}</h5>
      </div>
      <span className="lowerDate">
        {subtask.startDate} - {subtask.endDate}
      </span>
      {subtask.assignees && subtask.assignees.length > 0 && (
        <div className="assigneeTags">
          {subtask.assignees.map((assignee, index) => (
            <span key={index} className="assigneeTag">
              {assignee}
            </span>
          ))}
        </div>
      )}
      {subtask.tags && subtask.tags.length > 0 && (
        <div className="tagList">
          {subtask.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LowerTodoList;
