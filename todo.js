let todos = getSavedTodos();

const filters = {
    searchText:'',
    hidecompleted: false
}    

renderTodos(todos, filters);

// submit eventlistener
document.querySelector('#addTodo').addEventListener('submit' , (e) => {
    e.preventDefault();
    if(e.target.elements.NewTodo.value) {
        todos.push({
            id: uuidv4(),
            text:e.target.elements.NewTodo.value,
            completed:false
        }) 
    } else {
        alert('please enter the name of the todo')
    }
    
    saveTodos();
    e.target.elements.NewTodo.value = ''
    
    renderTodos(todos, filters);
    
})

document.querySelector('#search-todo').addEventListener('input', (e) =>  {
    filters.searchText = e.target.value
    renderTodos(todos, filters);
    
})

document.querySelector('#hide-completed').addEventListener('change' , (e) => {
    filters.hidecompleted = e.target.checked;
    renderTodos(todos, filters);
    
})


