import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

describe('<Blog />', () => {
    let container
    const blog =  {
        "url": "localhost",
        "title": "Jorman Blogi 1",
        "author": "Jorma",
        "user": {
          "username": "root",
          "name": "Jorma",
          "id": "6716192a3b8654255313f36c"
        },
        "likes": 31,
        "id": "671619fed3a07275e68cf262"
      }
    const LikeBlog = () => {
      console.log("juu")
    }
    const user = {  
        "username": "root",
        "name": "Jorma"}
    beforeEach(() => {
      container = render(
        <Blog key={blog.id}  blog={blog}  buttonLabel="view" user={user} LikeBlog={LikeBlog}/>
      ).container
    })
    test('at start the children are not displayed', () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
      })
    test('Blog renders only title and author', async () => {
        const element = screen.getAllByText('Jorman Blogi 1 Jorma')
        expect(element).toBeDefined()
    })
    test('after clicking the button, All children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
        const url = screen.getByText('localhost')
        expect(url).toBeDefined()
        const likes = screen.getByText('Likes 31')
        expect(likes).toBeDefined()
        const creator = screen.getByText('Jorma')
        expect(creator).toBeDefined()
    })

})