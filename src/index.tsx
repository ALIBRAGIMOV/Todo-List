import React, { Fragment, useState } from "react";
import ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

type FormElem = React.FormEvent<HTMLFormElement>;
interface ITodo {
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };
  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const compleTodo = (index: number): void => {
    const newTodos: ITodo[] = [... todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col col-lg-5">
            <h1>Список дел</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <input
                    type="text"
                    className="form-control"
                    value={value}
                    placeholder="Поле для добавления"
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
        <section>
          {todos.map((todo: ITodo, index: number) => (
            <Fragment key={index}>
              <div style={{textDecoration: todo.complete ? 'line-through' : ''}}>{todo.text}</div>
              <button className="btn btn-primary" type="button" onClick={() => compleTodo(index)}>
                {' '}
                {todo.complete ? 'Не завершено' : 'Завершено'}
              </button>
              <button className="btn btn-warning" type="button" onClick={() => removeTodo(index)}>
                &times;
              </button>
            </Fragment>
          ))}
        </section>
      </div>
    </Fragment>
  );
}

const root = document.getElementById("app-root");

ReactDom.render(<App />, root);
