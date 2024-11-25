import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls event handler with the right details when new blog is created', async () => {
    const mockHandler = vi.fn()
    const container = render(<BlogForm createBlog={mockHandler} />).container
    const user = userEvent.setup()

    const titleField = container.querySelector('#title')
    await user.type(titleField, 'A New Blog')

    const authorField = container.querySelector('#author')
    await user.type(authorField, 'Test Author')

    const urlField = container.querySelector('#url')
    await user.type(urlField, 'blog.com')

    const submitButton = screen.getByText('create')
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('A New Blog')
    expect(mockHandler.mock.calls[0][0].author).toBe('Test Author')
    expect(mockHandler.mock.calls[0][0].url).toBe('blog.com')
  })
})