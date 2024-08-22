import { Check, Plus, Trash } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { CreateTaskModal } from "./create-task-modal";
import { taskServices } from "../../services/api/task-services";
import { ErrorAlert } from "./error-alert";

interface ITaskListProps {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

export function TodoList() {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [list, setList] = useState<ITaskListProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorCreateAlert, setErrorCreateAlert] = useState(false);

  const handleTaskModalOpen = () => {
    setIsCreateTaskModalOpen(true);
  };

  const handleTaskModalClose = () => {
    setIsCreateTaskModalOpen(false);
  };

  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleErrorCreateAlertOpen = () => {
    setErrorCreateAlert(true);
  };

  const handleErrorCreateAlertClose = () => {
    setErrorCreateAlert(false);
  };

  useEffect(() => {
    const listTasks = async () => {
      try {
        const tasks = await taskServices.getTasks();
        if (tasks) {
          setList(tasks);
        }
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    listTasks();
  }, []);

  const createTask = async () => {
    if (title === "" || description === "") {
      handleErrorCreateAlertOpen();
      return;
    }

    try {
      const newTask = {
        name: title,
        description,
        completed: false,
      };
      const task = await taskServices.createTask(newTask);
      if (task && task.id) {
        setList((prevList) => [...prevList, task]);
        setTitle("");
        setDescription("");
        handleTaskModalClose();
      }
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  const editTask = async (task: ITaskListProps, id: number) => {
    try {
      const updatedTask = {
        name: task.name,
        description: task.description,
        completed: !task.completed,
      };
      const updatedTaskData = await taskServices.updateTask(updatedTask, id);
      if (updatedTaskData) {
        setList((prevList) =>
          prevList.map((item) =>
            item.id === id ? { ...item, ...updatedTaskData } : item
          )
        );
      }
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const task = await taskServices.deleteTask(id);
      if (task) {
        setList((prevList) => prevList.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  return (
    <div className="h-screen bg-zinc-800 w-sreen">
      <div className="p-5 bg-zinc-800 sm:p-10 sm">
        <div className="px-20 sm:p-0">
          <div className="text-zinc-300 flex items-center justify-between w-full">
            <span className="text-zinc-300 text-xl">TODO LIST APP</span>
            <button
              onClick={handleTaskModalOpen}
              className="flex items-center gap-2 bg-zinc-900 h-12 p-4 rounded-md"
            >
              <span>Criar Tarefa</span>
              <Plus className="size-5" />
            </button>
          </div>

          <div>
            {isCreateTaskModalOpen && (
              <CreateTaskModal
                onCloseModal={handleTaskModalClose}
                handleTitleInput={handleTitleInput}
                handleDescriptionInput={handleDescriptionInput}
                titleValue={title}
                descriptionValue={description}
                createTasks={createTask}
              />
            )}
          </div>
          <div className="flex flex-wrap flex-col items-center bg-zinc-900 p-5 m-5 text-zinc-200 rounded-xl">
            <h1 className="text-xl">Tarefas</h1>
            {list.filter((task) => !task.completed).length === 0 ? (
              <div className="text-zinc-400 text-xl mt-5">nenhuma tarefa cadastrada</div>
            ) : (
              ""
            )}
            {list
              .filter((task) => !task.completed)
              .map((task) => (
                <div className="w-full" key={task.id}>
                  <div className="flex justify-between w-full px-5 py-2 my-4">
                    <div className="w-full flex flex-col flex-wrap">
                      <span>{task.name}</span>
                      <span className="text-zinc-400">{task.description}</span>
                    </div>
                    <div className="flex justify-around gap-2 w-24 ml-2">
                      <button
                        onClick={() => {
                          editTask(task, task.id);
                        }}
                      >
                        <Check className="text-gray-400 p-2 h-10 w-10 hover:bg-zinc-700 rounded-md" />
                      </button>
                      <button onClick={() => deleteTask(task.id)}>
                        <Trash className="text-gray-400 p-2 h-10 w-10 hover:bg-zinc-700 rounded-md" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-full bg-gray-600 h-px mx-10" />
                  </div>
                </div>
              ))}
            <h1 className="text-xl mt-8">Tarefes concluídas</h1>
            {list.filter((task) => task.completed).length === 0 ? (
              <div className="text-zinc-400 text-xl mt-5">
                nenhuma tarefa concluída
              </div>
            ) : (
              ""
            )}
            {list
              .filter((task) => task.completed)
              .map((task) => (
                <div className="w-full" key={task.id}>
                  <div className="flex justify-between w-full px-5 py-2 my-4">
                    <div className="w-full flex flex-col">
                      <span>{task.name}</span>
                      <span className="text-zinc-400">{task.description}</span>
                    </div>
                    <div className="flex justify-around w-24 ml-2">
                      <button
                        onClick={() => {
                          editTask(task, task.id);
                        }}
                      >
                        <Check className="text-green-500 p-2 h-10 w-10 hover:bg-zinc-700 rounded-md" />
                      </button>
                      <button onClick={() => deleteTask(task.id)}>
                        <Trash className="text-gray-400 p-2 h-10 w-10 hover:bg-zinc-700 rounded-md" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-full bg-gray-600 h-px mx-10" />
                  </div>
                </div>
              ))}

            {errorCreateAlert && (
              <ErrorAlert
                message="Erro: Preencha todos os campos."
                onClose={handleErrorCreateAlertClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
