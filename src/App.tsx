import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks, { ITask } from "./components/Tasks";
import { v4 } from "uuid";
import PageTitle from "./components/PageTitle";

const App = () => {
  const [tasks, setTasks] = useState<ITask[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // EXAMPLE: USING API FOR GETTING TASKS
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       { method: "GET" }
  //     );

  //     const data = await response.json();

  //     setTasks(data);
  //   };

  //   fetchTasks();
  // }, []);

  const onTaskClick = (taskId: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });

    setTasks(newTasks);
  };

  const onDeleteTaskClick = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  };

  const onAddTaskSubmit = (title: string, description: string) => {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <PageTitle children="Tasks Manager" />
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
};

export default App;
