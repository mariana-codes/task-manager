import { CheckIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export interface ITask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface TasksProps {
  tasks: ITask[];
  onTaskClick: (taskId: string) => void;
  onDeleteTaskClick: (taskId: string) => void;
}

const Tasks = (props: TasksProps) => {
  const { tasks, onTaskClick, onDeleteTaskClick } = props;
  const navigate = useNavigate();

  const onSeeDetailsClick = (title: string, description: string) => {
    // URLSearchParams is important for string handling (deal with spaces, etc...)
    const query = new URLSearchParams();
    query.set("title", title);
    query.set("description", description);
    navigate(`/task?${query.toString()}`);
  };

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map(({ title, id, description, isCompleted }) => (
        <li key={id} className="flex gap-2">
          <button
            onClick={() => onTaskClick(id)}
            className={`w-full flex items-center gap-2 bg-slate-400 text-left text-white p-2 rounded-md ${
              isCompleted && "line-through"
            }`}
          >
            {isCompleted && <CheckIcon />}
            {title}
          </button>
          <Button onClick={() => onSeeDetailsClick(title, description)}>
            <ChevronRightIcon />
          </Button>
          <Button
            children={<TrashIcon />}
            onClick={() => onDeleteTaskClick(id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default Tasks;
