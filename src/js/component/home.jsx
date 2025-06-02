import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//include images into your bundle

//create your first component
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  //funcion que se activara cada que presione Enter.
  const handleKeyPress = (e) => {
    //si la tecla que se presionó es "Enter" y el valor que hay en inputValue no esta vacio llamar addTask
    if (e.key === "Enter" && inputValue.trim() !== "") {
      //trim se asegura que el texto no este vacio
      addTask(inputValue);
      setInputValue("");
    }
  };

  //funcion para añadir nueva tarea
  const addTask = (task) => {
    setTasks([...tasks, task]); //setTasks coge "tasks" y añade la tarea nueva(task) al final de la lista
  };

  //funcion para eliminar una tarea
  const deleteTask = (index) => {
    // deleteTask toma como parámetro index (posicion de la tarea para eliminar)
    const updatedTasks = [...tasks]; //copia del array original
    updatedTasks.splice(index, 1); //eliminamos el elemento en la posicion"index" (1cantidad de elementos para eliminar)
    setTasks(updatedTasks); // funcion que actualiza el estado con el nuevo array
  };

  return (
    <>
      <div className="container todo">
        <h1>To Do List</h1>
      </div>
      <div className="container tasks">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} //cada cambio se actualiza el valor de inputValue segun el valor del evento
          onKeyDown={handleKeyPress}
          placeholder="Add a new task"
          className="newTask"
        />
        <ul className="todoList">
          {tasks.length === 0 ? (
            <li>No tasks available</li>
          ) : (
            tasks.map(
              (
                task,
                index //si la longitud de la tarea es igual a 0 entonces se mostara "li", de lo contrario añadira la tarea nueva
              ) => (
                <li
                  key={index}
                  onMouseEnter={() => setIsHovered(index)} //establece el estado al index de la tarea
                  onMouseLeave={() => setIsHovered(null)} //restablece el estado cuando el raton se va
                >
                  {task}
                  <button
                    onClick={() => deleteTask(index)} //al hacer click se llama a la funcion deleteTask
                    className="btn-close"
                    //mostrar el boton solo si isHovered es igual al indice actual
                    style={{ display: isHovered === index ? "inline" : "none" }}
                  ></button>
                </li>
              )
            )
          )}
        </ul>

        <footer className="footer">
          <p>{tasks.length} item left</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
