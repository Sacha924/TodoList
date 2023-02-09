import React, { useState, useEffect, useRef } from "react";
import Todo from "../model";
import { AiFillEdit, AiFillDelete, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./../styles/singleTodo.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
    setEdit(false);
  };

  const handleImportant = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo)));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form className={`todos__single ${!todo.isImportant ? "lessImportant" : ""}`}  onSubmit={(e) => handleEdit(e, todo.id)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {edit ? (
            <input
              type="text"
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text invisible-background"
              onBlur={(e) => {
                handleEdit(e, todo.id);
              }}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
            {todo.isImportant ? (
              <span className="icon" onClick={() => handleImportant(todo.id)}>
                <AiFillStar />
              </span>
            ) : (
              <span className="icon" onClick={() => handleImportant(todo.id)}>
                <AiOutlineStar />
              </span>
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
