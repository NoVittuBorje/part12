import React from 'react'
import Todo from './Todo'
const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }
  return (
    <>
      {todos.map(todo => {
        return (
          <Todo onClickComplete={onClickComplete} onClickDelete={onClickDelete} todo={todo}/>
        )
      }).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}

export default TodoList
