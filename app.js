const formAddTodos = document.querySelector('.form-add-todo')
const formSearch = document.querySelector('.form-search input')
const todoContainer = document.querySelector('.todos-container')

const addTodo = (todo) => {
  todoContainer.innerHTML += `
  <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="far fa-trash-alt delete"></i>
  </li>
  `
}

const resetInput = (target) => target.reset()

formAddTodos.addEventListener('submit', (event) => {
  event.preventDefault()
  const target = event.target
  const todo = target.add.value.trim()

  addTodo(todo)
  resetInput(target)
})

todoContainer.addEventListener('click', (event) => {
  const target = event.target
  console.log(target)
  const targetClassList = target.classList
  const isClassDelete = Array.from(targetClassList).includes('delete')

  if (isClassDelete) {
    target.parentElement.remove()
  }
})

formSearch.addEventListener('input', (event) => {
  event.preventDefault()
  const termToSearch = event.target.value.toLowerCase().trim()
  const todoLis = todoContainer.querySelectorAll('li')

  Array.from(todoLis)
    .filter((todo) => !todo.textContent.toLowerCase().includes(termToSearch))
    .forEach((todo) => {
      todo.classList.remove('d-flex')
      todo.classList.add('hidden')
    })

  Array.from(todoLis)
    .filter((todo) => todo.textContent.toLowerCase().includes(termToSearch))
    .forEach((todo) => {
      todo.classList.remove('hidden')
      todo.classList.add('d-flex')
    })
})
