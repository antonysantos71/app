import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { TodoList } from "./pages/todo-list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />
  },
]);

export function App() {
  return (
    <RouterProvider router={router} />
  )
}