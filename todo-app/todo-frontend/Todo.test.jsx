import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from './src/Todos/Todo'


describe('Todo test <Todo/>', () => {
    const todo = {
        text:"testi toimii",
        done:false
    }
    const onClickComplete = () => {
    }
    const onClickDelete = () => {

    }
    let container
    beforeEach(() => {
        container = render(
            <Todo onClickComplete={onClickComplete} onClickDelete={onClickDelete} todo={todo}/>
          ).container
      })
    test('Todo works', async () => {
        const element = screen.getAllByText('testi toimii')
        expect(element).toBeDefined()
    })
  });