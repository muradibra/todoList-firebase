import { createContext, useState } from "react";
import { TodoProps } from "../types/registerProps";

type TodoContextProviderProps = {
  children: React.ReactNode;
};

type TodoContextType = {
  todos: TodoProps | null,
  setTodos: React.Dispatch<React.SetStateAction<TodoProps>>
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [todos, setTodos] = useState<TodoProps>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
