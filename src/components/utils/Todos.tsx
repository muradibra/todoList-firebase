import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { TodoContext } from "../../context/todoContext";
import { TodoProps } from "../../types/registerProps";

const Todos: React.FC = () => {
  const [editState, setEditState] = useState<string | null>(null);
  const [updatedTodo, setUpdatedTodo] = useState<string>("");
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      "useContext(TodoContext) must be used within a TodoContextProvider"
    );
  }
  const { todos, setTodos } = context;
  const userId = auth.currentUser?.uid;
  const todoCollectionRef = query(
    collection(db, "todos"),
    where("uid", "==", userId)
  );

  useEffect(() => {
    getTodos();

    const unsubscribe = onSnapshot(todoCollectionRef, (snapshot) => {
      const updatedTodos = snapshot.docs.map((todo) => ({
        ...todo.data(),
        id: todo.id,
      })) as TodoProps;
      setTodos(updatedTodos);
    });

    return () => unsubscribe();
  }, []);

  const getTodos = async () => {
    try {
      const data = await getDocs(todoCollectionRef);
      const filteredData = data.docs.map((todo) => ({
        ...todo.data(),
        id: todo.id,
      })) as TodoProps;
      console.log(filteredData);
      setTodos(filteredData);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    const docReference = doc(db, "todos", `${id}`);
    await deleteDoc(docReference);
  };

  const startEditing = (id: string, prevTodo: string) => {
    setEditState(id);
    setUpdatedTodo(prevTodo);
  };

  const updateTodo = async (id: string) => {
    if (!todos) return;

    const updatedTodos = todos?.map((todo) =>
      todo.id === id ? { ...todo, todo: updatedTodo } : todo
    );
    setTodos(updatedTodos);

    const docReference = doc(db, "todos", `${id}`);
    try {
      await updateDoc(docReference, {
        todo: updatedTodo,
      });
      setEditState(null);
      setUpdatedTodo("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="todos">
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            {editState === todo.id ? (
              <input
                type="text"
                value={updatedTodo}
                onChange={(e) => setUpdatedTodo(e.target.value)}
              />
            ) : (
              todo.todo
            )}
            <div>
              {editState === todo.id ? (
                <button onClick={() => updateTodo(todo.id)}>Update</button>
              ) : (
                <button onClick={() => startEditing(todo.id, todo.todo)}>
                  Edit
                </button>
              )}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
