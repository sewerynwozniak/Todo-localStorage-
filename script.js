const inputContainer = document.querySelector('.todo__inputContainer');
const todo__lists = document.querySelector('.todo__lists');
const input = document.querySelector('.todo__input');
const deleteButtons = document.querySelectorAll('.todo__deleteButton');
const todo__alert = document.querySelector('.todo__alert');
const todo__todo = document.querySelectorAll('.todo__todo');
let todoArray;


// Add event listener on form
inputContainer.addEventListener('submit', addNewTodo);

//Fire display function
displayTodo()


function deleteTodoFunction(e){
e.target.parentNode.style.animation ='deleteTodoAnimation 0.3s linear';
setTimeout(()=>{
    todo__lists.removeChild(e.target.parentNode);
},300) 

//delete from localStorage
let target = e.target.previousElementSibling.textContent;
todoArray = todoArray.filter(todo=> todo != target)
localStorage.setItem('todo', JSON.stringify(todoArray))
}


function createElementFunction(todo){

    let singleTodoContainer = document.createElement('div');
    singleTodoContainer.classList.add('todo__singleTodoContainer');
    
    let singleTodo = document.createElement('div');
    singleTodo.classList.add("todo__todo");
    singleTodo.textContent = todo
    singleTodo.addEventListener('click', addLineThrough)
    
    let deleteButton = document.createElement('button');
    deleteButton.textContent ='X'
    deleteButton.classList.add("todo__deleteButton");
    deleteButton.addEventListener('click', deleteTodoFunction);
    
    singleTodoContainer.appendChild(singleTodo)
    singleTodoContainer.appendChild(deleteButton)
    todo__lists.appendChild(singleTodoContainer)
}



function addNewTodo(e){
e.preventDefault()
//Fire animation when input is empty
if(input.value==''){
todo__alert.style.animation = 'alertAnimation 4s'
return setTimeout(()=>todo__alert.style.animation = '',4000) 
}

createElementFunction(input.value)

//Add to localStorage
if(localStorage.getItem('todo')==null) todoArray =[]
todoArray.push(input.value);
localStorage.setItem('todo', JSON.stringify(todoArray))

//Clear input
input.value = '';
}


function displayTodo(){
if(localStorage.getItem('todo')==null) return;
todoArray = JSON.parse(localStorage.getItem('todo'))
todoArray.forEach(todo=>createElementFunction(todo))
}



function addLineThrough(e){
    e.target.style.textDecoration==''? 
    e.target.style.textDecoration='line-through' : e.target.style.textDecoration='';
}



