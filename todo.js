const todoForm = document.querySelector(".js-todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todoList");

const TODOS_LS = "todo";
let savedTodoArr = [];   //array to keep the todos


//Delete a todo
function deleteTodo(event){
    const btn = event.target;    
    const li = btn.parentNode;  //get btn's parent id

    todoList.removeChild(li);

    // use filter to keep un-deleted todos in an array
    const leftTodos = savedTodoArr.filter(function(todo){
        //todo.id = int / li.id = String
        return todo.id != parseInt(li.id);
    });

    savedTodoArr = leftTodos; //replace the savedTodos with leftTodos
    saveTodos();

}


//Save the todos in LS
function saveTodos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(savedTodoArr));
    // JSON.stringify = JS object to String
}


// Show the TODO list!
function showTodo(todo){
    // console.log(todo);
    const li = document.createElement("li");    //create an li for new todo

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "&#10004";   //HTML emoji checkmark
    delBtn.addEventListener("click", deleteTodo);   //delete function

    const space = document.createElement("span");
    space.innerHTML = "&nbsp;&nbsp;";   //btn과 task 사이의 공백

    const span = document.createElement("span");
    span.innerText = todo;

    const newId = savedTodoArr.length+1;   //unique id for todos

    li.appendChild(delBtn);
    li.appendChild(space);
    li.appendChild(span);
    li.id = newId;  //li의 id에 숫자로 이름을 정하자

    todoList.appendChild(li);

    // todo를 하나의 object로 만들어서 관리하자
    const todoObj = {
        todo: todo,
        id: newId
    };

    savedTodoArr.push(todoObj);    //savedTodo 배열에 todoObj를 넣는다
    saveTodos();
}


// Submit todo form
function handleSubmit(event){
    event.preventDefault();

    const currentTodo = todoInput.value;
    showTodo(currentTodo);
    todoInput.value = "";   //input 창 다시 empty하게 설정

}


// Load saved todos
function loadTodos(){
    const loadedTodos = localStorage.getItem(TODOS_LS);

    if(loadedTodos != null) {
        const parsedTodos = JSON.parse(loadedTodos);    //loadedTodos to array
        // console.log(parsedTodos);

        //for each 
        parsedTodos.forEach(function(todo){
            showTodo(todo.todo);
            // console.log(todo.todo);
        });
        
    }
}

function init(){
    loadTodos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();