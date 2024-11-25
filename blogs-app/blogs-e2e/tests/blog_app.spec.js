const { test, describe, beforeEach, expect } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Root User',
        username: 'root',
        password: 'sekret'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Other User',
        username: 'other',
        password: 'othersekret'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'sekret')

      await expect(page.getByText('blogs')).toBeVisible()
      await expect(page.getByText('Root User logged in')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrong')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Root User logged in')).not.toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'sekret')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'first blog', 'peter', 'blog.com')

      await expect(page.getByText('a new blog first blog by peter added')).toBeVisible()
      await expect(page.getByText('first blog peter')).toBeVisible()
    })

    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blog', 'peter', 'blog.com')
        await createBlog(page, 'second blog', 'jason', 'temp.com')
        await createBlog(page, 'third blog', 'matt', 'notes.com')
      })

      test('a blog can be liked', async ({ page }) => {
        const firstBlog = await page.getByText('first blog peter')
        await firstBlog.getByRole('button', { name: 'show' }).click()

        const firstBlogOpened = await page.getByText('first blog peterhide').locator('..')
        await expect(firstBlogOpened.getByText('blog.com')).toBeVisible()
        await expect(firstBlogOpened.getByText('likes 0 like')).toBeVisible()

        await firstBlogOpened.getByRole('button', { name: 'like' }).click()
        await expect(firstBlogOpened.getByText('likes 1 like')).toBeVisible()
      })

      test('a blog created by the user can be deleted', async ({ page }) => {
        await page.pause()
        const secondBlog = await page.getByText('second blog jason')
        await secondBlog.getByRole('button', { name: 'show' }).click()

        const secondBlogOpened = await page.getByText('second blog jasonhide').locator('..')
        page.on('dialog', dialog => dialog.accept())
        await secondBlogOpened.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('second blog jason')).not.toBeVisible()
      })

      test('a user can remove blogs they created but not others', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'other', 'othersekret')
        await createBlog(page, 'other blog', 'tully', 'other.com')

        const firstBlog = await page.getByText('first blog peter')
        await firstBlog.getByRole('button', { name: 'show' }).click()
        const firstBlogOpened = await page.getByText('first blog peterhide').locator('..')
        await expect(firstBlogOpened.getByRole('button', { name: 'remove' })).not.toBeVisible()

        const lastBlog = await page.getByText('other blog tully')
        await lastBlog.getByRole('button', { name: 'show' }).click()
        const lastBlogOpened = await page.getByText('other blog tullyhide').locator('..')
        await expect(lastBlogOpened.getByRole('button', { name: 'remove' })).toBeVisible()
      })

      test('blogs are arranged in order according to their likes', async ({ page }) => {
        await page.pause()
        let blogDivs = await page.locator('.info').locator('..').all()
        await expect(blogDivs[0].getByText('first blog peter')).toBeVisible()
        await expect(blogDivs[1].getByText('second blog jason')).toBeVisible()
        await expect(blogDivs[2].getByText('third blog matt')).toBeVisible()

        // Give one like to second blog and two likes to third blog
        await likeBlog(page, 'second blog jason', 1)
        await likeBlog(page, 'third blog matt', 2)

        // Order should be flipped
        blogDivs = await page.locator('.info').locator('..').all()
        await expect(blogDivs[0].getByText('third blog matt')).toBeVisible()
        await expect(blogDivs[1].getByText('second blog jason')).toBeVisible()
        await expect(blogDivs[2].getByText('first blog peter')).toBeVisible()
      })
    })
  })
})
