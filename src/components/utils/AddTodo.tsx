import React, { useState } from "react";
import { addTodoToDb, auth } from "../../firebase";

const AddTodo: React.FC = () => {
  const [todo, setTodo] = useState("");
  // const todoCollectionRef = collection(db, `${}}`)
  const addTodo = async () => {
    await addTodoToDb({ todo: todo, uid: auth.currentUser?.uid });
    setTodo("");
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={addTodo}>add</button>
    </div>
  );
};

export default AddTodo;
