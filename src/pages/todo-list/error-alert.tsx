import { AlertCircle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

export const ErrorAlert = ({ message, onClose }: ErrorAlertProps) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10 bg-red-800 text-red-200 border border-red-600 px-4 py-3 rounded-md shadow-lg flex items-center max-w-lg w-full">
      <AlertCircle className="w-6 h-6 mr-3" />
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="ml-4">
        <X className="w-6 h-6 hover:text-red-400 transition-colors" />
      </button>
    </div>
  );
};

