// let todos = [];
let filterValue = 'all';
const todoInput = document.querySelector('.todo-input');
const todoForm = document.querySelector('.todo-form');
const todoList = document.querySelector('.todolist');
const selectFilter = document.querySelector('.filter-todos');




todoForm.addEventListener('submit',addNewTodo);
selectFilter.addEventListener('change',(e)=>{
  filterValue = e.target.value;
  filterTodos();
});

document.addEventListener('DOMContentLoaded',(e)=>{
  const todos = getAllTodos();
  createTodos(todos);
})
function addNewTodo(e){
  e.preventDefault();
  if(!todoInput.value) return null;
  const newTodo = {
    id : Date.now(),
    createdAt : new Date().toISOString(),
    title : todoInput.value ,
    isCompleted : false,
  };
 saveTodo(newTodo);
  filterTodos();
}
function createTodos(todos) {
  // create todos on DOM
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
      <p class="todo__title ${todo.isCompleted && "completed"}">${todo.title}</p>
      <span class="todo__createdAt">${new Date(
        todo.createdAt
      ).toLocaleDateString("fa-IR")}</span>
      <button class="todo__check" data-todo-id=${
        todo.id
      } ><i class="far fa-check-square"></i></button>
      <button class="todo__remove" data-todo-id=${
        todo.id
      } ><i class="far fa-trash-alt"></i></button>
    </li>`;
  });

  todoList.innerHTML = result;
  todoInput.value = "";
  const removeBtns = [...document.querySelectorAll('.todo__remove')];
  removeBtns.forEach((btn)=> btn.addEventListener('click',removeTodo));

  const checkBtns = [...document.querySelectorAll('.todo__check')];
  checkBtns.forEach((btn)=> btn.addEventListener('click',checkTodo));
}
function filterTodos(e){
  //const filter = e.target.value;
  const todos =  getAllTodos();
  switch(filterValue){
    case 'all':{
        createTodos(todos);
        break;
    }
    case 'completed':{
     const filteredTodos = todos.filter((t)=> t.isCompleted);
     console.log(filteredTodos);
     createTodos(filteredTodos);
     break;
    }
    case 'uncompleted':{
      const filteredTodos = todos.filter((t)=> !t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
  }
}
function removeTodo(e){
let todos = getAllTodos();
const todoId = Number(e.target.dataset.todoId);
const filteredTodos = todos.filter((t)=>t.id!==todoId);

todos = filteredTodos;
saveAllTodos(todos)
filterTodos();

}
function checkTodo(e){
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t)=> t.id===todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
  
}

function getAllTodos(){
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
return savedTodos;
}

function saveTodo(todo){
  const saveTodos = JSON.parse(localStorage.getItem("todos")) || [];
saveTodos.push(todo);
localStorage.setItem("todos",JSON.stringify(saveTodos));
return saveTodos;
}

function saveAllTodos(todos){
  localStorage.setItem('todos',JSON.stringify(todos));
}