import { api } from "..";

interface ITaskProps {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

const getTasks = async (): Promise<ITaskProps[] | undefined> => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (err) {
    alert(err || "Something went wrong")
  }
}

const createTask = async (task: ITaskProps) => {
  try {
    const response = await api.post("/tasks", task);
    return response.data;
  } catch (err) {
    alert(err || "Something went wrong")
  }
}

const updateTask = async (task: Omit<ITaskProps, 'id'>, id: number) => {
  try {
    const response = await api.put(`/tasks/${id}`, {
      name: task.name,
      description: task.description,
      completed: task.completed,
    });
    return response.data;
  } catch (err) {
    alert(err || "Something went wrong")
  }
}

const deleteTask = async (id: number) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (err) {
    alert(err || "Something went wrong")
  }
}

export const taskServices = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}