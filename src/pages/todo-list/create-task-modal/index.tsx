import { X } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./components/button";
import { Input } from "./components/input";

interface ITaskModalProps {
  onCloseModal: () => void;
  handleTitleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionInput: (e: ChangeEvent<HTMLInputElement>) => void;
  titleValue: string;
  descriptionValue: string;
  createTasks: () => void;
}

export const CreateTaskModal = ({
  onCloseModal,
  handleTitleInput,
  handleDescriptionInput,
  titleValue,
  descriptionValue,
  createTasks
}: ITaskModalProps) => {
  return (
    <div className="bg-zinc-800 fixed inset-0 z-10 flex items-center justify-center">
      <div className="space-y-3 flex items-center justify-center w-1/3 flex-col bg-zinc-900 px-8 py-7 rounded-xl">
        <div className="flex items-center justify-between w-full text-gray-300">
          <h1 className="text-xl">Criar Tarefa</h1>
          <button onClick={onCloseModal}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2.5">
          <Input
            type="text"
            placeholder="titulo da tarefa"
            onChange={handleTitleInput}
            value={titleValue}
          />
          <Input
            type="text"
            placeholder="descrição da tarefa "
            onChange={handleDescriptionInput}
            value={descriptionValue}
          />
          <div className="flex justify-between gap-4">
            <Button onClick={onCloseModal} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={createTasks} variant="secondary">
              Criar tarefa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
