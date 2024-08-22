import { ChangeEvent } from "react";

interface IInputProps {
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Input = ({type, placeholder, onChange, value}: IInputProps) => {
  return (
    <input
      className=" 
      focus:outline-none focus:ring-2 focus:ring-dark-blue-500 border-none border-gray-300 
      rounded-md p-2 w-full bg-zinc-800 text-zinc-300"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}