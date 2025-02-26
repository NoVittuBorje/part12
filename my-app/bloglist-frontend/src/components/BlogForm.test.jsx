import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { describe, expect } from 'vitest'
describe('<BlogForm /> test', async() => {
    test("Blogform test", async () => {
        
        const user = userEvent.setup()
        const addBlog = vi.fn()
        render(
            <Togglable buttonLabel="Create new blog" >
                <BlogForm addBlog={addBlog}/>
            </Togglable>
        ).container
      
        
        const createBlog = screen.getByText("Create new blog")
        await user.click(createBlog)
        const Title = screen.getByTestId('Title')
        const Author = screen.getByTestId('Author')
        const Url = screen.getByTestId('Url')
        const createButton = screen.getByText('create')

        await user.type(Title, 'Jorma')
        await user.type(Author, 'Pentti')
        await user.type(Url, 'localhost')
        await user.click(createButton)

        expect(addBlog.mock.calls).toHaveLength(1)
        
        expect(addBlog.mock.calls[0][0].title).toBe('Jorma')
        expect(addBlog.mock.calls[0][0].author).toBe('Pentti')
        expect(addBlog.mock.calls[0][0].url).toBe('localhost')
    })
})