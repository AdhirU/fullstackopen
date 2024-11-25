const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.locator('#title').fill(title)
  await page.locator('#author').fill(author)
  await page.locator('#url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} ${author}`).waitFor()
}

const likeBlog = async (page, blogName, times) => {
  const blog = await page.getByText(blogName)
  await blog.getByRole('button', { name: 'show' }).click()

  const blogOpened = await page.getByText(`${blogName}hide`).locator('..')
  for (let i = 0; i < times; i++) {
    await blogOpened.getByRole('button', { name: 'like' }).click()
    await blogOpened.getByText(`likes ${i+1} like`).waitFor()
  }
  await blogOpened.getByRole('button', { name: 'hide' }).click()
}

export { loginWith, createBlog, likeBlog }