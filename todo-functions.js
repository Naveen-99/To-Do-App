// fetch todos from the local storage if any
const getSavedTodos = () => {
    
    let todosJSON = localStorage.getItem('todos')
    // and store it in array
    return todosJSON !== null ? JSON.parse(todosJSON) : []
}

// save the todos to local storage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// removes todo when user clicks on x button
const removeTodo = function (id) {
    const index = todos.findIndex((todo) => todo.id === id )

    if(index > -1) {
        todos.splice(index, 1)
    }
    saveTodos()
}

// upadtes when the checkbox is checked or unchecked
const toggleTodo = (id) => {
    const todo = todos.find( (todo) => todo.id === id)
    
    if(todo) {
        todo.completed = !todo.completed
    }
}

// generate dom element for each filtered todos
const generateDomElement = function (todo) {
    const div = document.createElement('div')
    const checkbox = document.createElement('input')
    const text = document.createElement('span')
    const delButton = document.createElement('button')

    //set up todo checkbox
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    div.appendChild(checkbox)
    checkbox.addEventListener('change' , () => {
        toggleTodo(todo.id)
        saveTodos() 
        renderTodos(todos, filters)
    })
    

    // set up todo text
    text.textContent = todo.text
    div.appendChild(text)
    
    // set up delete button
    delButton.textContent = 'x'
    div.appendChild(delButton)
    delButton.addEventListener('click' ,() => {
        removeTodo(todo.id)
        saveTodos()
        renderTodos(todos, filters)
    })


    document.querySelector('#todo-list').appendChild(div);
}


// render todos 
const renderTodos = function (todos, filters) {
    // filter the todos as per the user input
    let filterdtodos = todos.filter( (todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    // filter todos if the checkbox checked
    filterdtodos = filterdtodos.filter( (todo) => {
        if(filters.hidecompleted) {
            return !todo.completed
        } else { 
            return true
            
        }
    })

    // get all the todos which are incompleted (completed : false)
    const incompleteTodos = filterdtodos.filter((todo) => !todo.completed)

    document.querySelector('#todo-list').innerHTML = ''
    // display to user about no of todos incompleted in the filteredtodos
    generateSummaryDOM(incompleteTodos)
    // displays all the todos which present in the filteredtodos
    // if no search input given, all the todos will be stored in the filteredtodos and displayed
    // if search input given , filtered todos will display in the browser
    filterdtodos.forEach( (todo) => {
        generateDomElement(todo)
    })
    
}

// generate summary: no todos incompleted
const generateSummaryDOM =  (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `you have ${incompleteTodos.length} todos to complete.`
    document.querySelector('#todo-list').appendChild(summary);
}