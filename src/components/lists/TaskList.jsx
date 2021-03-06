import React, { useEffect, useState } from "react";
import useList from "../hooks/useList";

const Tasklist = () => {
  const tasks = useList([]);
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    tasks.push(newTask);
    setNewTask("");
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  useEffect(() => {
    if (tasks.length > 0) tasks.order(newTask);
    return;
  }, [tasks, newTask]);

  useEffect(() => {
    if (tasks.length > 0) tasks.reverseOrder(newTask);
    return;
  }, [tasks, newTask]);

  return (
    <div>
      <h1 className="mb-5">Ejercicio 2: Agregar funciones a Tabla</h1>
      <div className={"card"}>
        <div className="card-body">
          <div>
            <h1 style={{ color: "black" }} className={"m-2 mb-4"}>
              Task List
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className={"input-group mb-3"}>
                <input
                  value={newTask}
                  onChange={handleInputChange}
                  placeholder="New Task"
                  type="text"
                  className={"form-control"}
                  autoFocus
                />
                <button type="submit" className={"btn btn-outline-secondary"}>
                  Create Task
                </button>
              </div>
            </form>
          </div>
          <div>
            {tasks.isEmpty() ? (
              <p style={{ color: "black" }}>Task List is Empty</p>
            ) : (
              <div>
                <ul className={"list-group list-group-flush m-4"}>
                  {tasks.value &&
                    tasks.value.map((oldValue, id) => (
                      <li key={id} className={"list-group-item"}>
                        <div className={"form-check"}>
                          <input
                            type="checkbox"
                            onClick={() => tasks.remove(id)}
                            className={"form-check-input"}
                            htmlFor={"task"}
                          />
                          <label
                            className={"form-check-label"}
                            htmlFor={"task"}
                          >
                            #{oldValue.id} - {oldValue.task}
                          </label>
                        </div>
                      </li>
                    ))}
                </ul>
                <button
                  onClick={tasks.clear}
                  className={"btn btn-outline-secondary m-3"}
                >
                  Clear List
                </button>
                <button
                  onClick={tasks.order}
                  className={"btn btn-outline-secondary m-3"}
                >
                  Alphabetical order
                </button>
                <button
                  onClick={tasks.orderById}
                  className={"btn btn-outline-secondary m-3"}
                >
                  Original state
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasklist;
