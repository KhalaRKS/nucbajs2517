// 1. DEFINIMOS LAS VARIABLES NECESARIAS DE LOS ELEMENTOS HTML
const input = document.querySelector(".input-text");
const addBtn = document.querySelector(".add-btn");
const addForm = document.querySelector(".add-form");
const tasksList = document.querySelector(".tasks-list");
const deleteBtn = document.querySelector(".deleteAll-btn");

/*Definimos la lista de tareas. Si existe un array de 
  tareas en el localstorage traera esa lista
En caso de que no exista, será un array vacío.*/
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/*Creamos la función que nos servira  para guardar las 
tareas en el localstorage a medida que las vayamos agregando*/
const saveLocalStorage = (tasksList) => {
  localStorage.setItem("tasks", JSON.stringify(tasksList));
};
// Creamos una función que recibira una
// tarea y se encargará del renderizado de cada tarea individual.
const createTask = (task) =>
  `<li>${task.name}<img class="delete-btn" src="./img/delete.svg" 
  alt="boton de borrar" data-name=${task.name}></li>`;

/*Creamos la lógica de renderización de la lista de tareas. 
  Va a recibir la lista de tareas y mediante el uso de map
  va a renderizar cada una de las tareas(usando la función createTask previamente definida). Finalmente,
  utilizaremos el método join para evitar que aparezca una coma entre las tareas a la hora 
  de renderizar*/

const renderTasksList = (todoList) => {
  tasksList.innerHTML = todoList.map((task) => createTask(task)).join("");
};

/*Creamos la lógica para esconder el botón de borrar todas, 
si no hay tareas en la lista de tareas, desaparecerá
sino, aparecerá.*/
const hideDeleteAll = (tasksList) => {
  if (!tasksList.length) {
    deleteBtn.classList.add("hidden");
    return;
  }
  deleteBtn.classList.remove("hidden");
};

/*1. Al ser un formulario, usamos prevent default para evitar el comportamiento "submit" por defecto.
  2. Guardamos en una constante la tarea ingresada,usando trim para borrar los espaciados previos y posteriores y además utilizaremos replace en conjunto con un regex (explicar brevemente que es un regex, decir que lo vamos a ver un poco mas en la clase de validación de formularios) para evitar que haya multiespaciado interno (EJ: "hacer   la   cama").
  3. Comprobamos si se ingreso una tarea vacía o si existe en el array de tareas una tarea con ese nombre
  4. Si pasa el proceso de verificación, Usando el spread operator, asignamos a las tareas el mismo array de tareas,
     pero sumando al array una nueva tarea que tendrá el nombre de la tarea ingresada(Aca podemos volver a mostrar lo relacionado al data-id de createTask y explicarles que se almacena eso mismo como data en el elemento).
  5. Reseteamos el valor del input
  6. Renderizamos las tareas
  7. Guardamos en el localStorage el nuevo array de tareas
  8. Verificamos si se debe ocultar o no el botón de borrar todas (Por si es la primera tarea que se agrega).*/
const addTask = (e) => {
  e.preventDefault();
  const taskName = input.value.trim().replace(/\s+/g, " ");
  console.log(taskName);
  if (!taskName.length) {
    alert("Por favor, ingrese una tarea");
    return;
  } else if (
    tasks.some((task) => task.name.toLowerCase() === taskName.toLowerCase())
  ) {
    alert("Ya existe una tarea con ese nombre");
    return;
  }

  tasks = [...tasks, { name: taskName }];
  input.value = "";
  renderTasksList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAll(tasks);
};
/*
1. Si el elemento apretado de la lista de tareas no contiene la clase "delete-btn" , no hacer nada (por eso el return) 
2. Creamos una variable en la que almacenamos el data-name que filtraremos para borrar la tarea
3. Filtramos la lista de tareas para que sea igual pero sin el elemento con el data-name de la variable anterior
4. Renderizamos las tareas
5. Guardamos en el localStorage el nuevo array de tareas
6. Verificamos si se debe ocultar o no el botón de borrar todas (Por si no quedan mas tareas al borrar la dada).
*/

const removeTask = (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const filterName = e.target.dataset.name;
  console.log(filterName);

  tasks = tasks.filter((task) => task.name !== filterName);
  renderTasksList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAll(tasks);
};

/*
1. Vaciamos el array de tareas
2. Renderizamos el array de tareas (quedará la lista vacía)
3. Guardamos este array vacío en el localstorage
4. Ocultamos el boton de borrar todas (ya que no quedarán tareas)
*/
const removeAll = () => {
  tasks = [];
  renderTasksList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAll(tasks);
};

const init = () => {
  renderTasksList(tasks);
  addForm.addEventListener("submit", addTask);
  tasksList.addEventListener("click", removeTask);
  deleteBtn.addEventListener("click", removeAll);
  hideDeleteAll(tasks);
};

init();
