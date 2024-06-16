import React from "react";
import AddTodo from "../utils/AddTodo";
import Todos from "../utils/Todos";
import { TodoContextProvider } from "../../context/todoContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Home: React.FC = () => {
  
  const logout = async () => {
    await signOut(auth);
  }

  return (
    <div className="home">
      <button onClick={logout}>Log out</button>
      <TodoContextProvider>
        <AddTodo />
        <Todos />
      </TodoContextProvider>
    </div>
  );
};

export default Home;
