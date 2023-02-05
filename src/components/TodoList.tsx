import React from "react";
import "./../styles/todoList.css";
import Todo from "./../model";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }: Props) => {
  return (
    <div className="todos">
       {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <span className="todo__text">{todo.todo}</span>
            <button className="todo__done">Done</button>
            <button className="todo__delete">Delete</button>
          </div>
        ))}
    </div>
  );
};

export default TodoList;
