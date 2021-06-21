const formAddTodos = document.querySelector('.form-add-todo')
const formSearch = document.querySelector('.form-search input')
const todoContainer = document.querySelector('.todos-container')

const setIdToIcon = () => {
  todoContainer.querySelectorAll('.delete').forEach((element, id) => {
    element.setAttribute('id', id)
  })
}

const addTodo = (todo) => {
  todoContainer.innerHTML += `
  <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i id="" class="far fa-trash-alt delete"></i>
  </li>
  `
  setIdToIcon()
}

const resetInput = (target) => target.reset()

const deleteTodo = (target) => {
  const targetClassList = target.classList
  const isClassDelete = Array.from(targetClassList).includes('delete')

  if (isClassDelete) {
    const id = target.getAttribute('id')
    const todoToRemove = todoContainer.children[Number(id)]

    todoToRemove.remove()
    setIdToIcon()
  }
}

const removeClassFromElement = (element, className) =>
  element.classList.remove(className)

const addClassToElement = (element, className) =>
  element.classList.add(className)

const searchTodo = (todoList, termToSearch, hasHiddenClass) => {
  const dflexClass = 'd-flex'
  const hiddenClass = 'hidden'

  todoList
    .filter((todo) =>
      !hasHiddenClass
        ? !todo.textContent.toLowerCase().includes(termToSearch)
        : todo.textContent.toLowerCase().includes(termToSearch)
    )
    .forEach((todo) => {
      removeClassFromElement(todo, !hasHiddenClass ? dflexClass : hiddenClass)
      addClassToElement(todo, !hasHiddenClass ? hiddenClass : dflexClass)
    })
}

formAddTodos.addEventListener('submit', (event) => {
  event.preventDefault()
  const target = event.target
  const todo = target.add.value.trim()
  const hasTextInTheInput = todo.length > 0
  
  if (hasTextInTheInput) {
    addTodo(todo)
    resetInput(target)
  }
})

todoContainer.addEventListener('click', (event) => {
  const target = event.target

  deleteTodo(target)
})

formSearch.addEventListener('input', (event) => {
  event.preventDefault()
  const termToSearch = event.target.value.toLowerCase().trim()
  const todoLis = todoContainer.children

  searchTodo(Array.from(todoLis), termToSearch, false)
  searchTodo(Array.from(todoLis), termToSearch, true)
})
