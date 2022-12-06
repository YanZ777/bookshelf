import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
import {buildUser, buildBook} from 'test/generate'
import {AppProviders} from 'context'
import {App} from 'app'
import * as usersDB from 'test/data/users'
import * as booksDB from 'test/data/books'
import * as listItemsDB from 'test/data/list-items'

// general cleanup
afterEach(async () => {
  queryCache.clear()
  await Promise.all([
    auth.logout(),
    usersDB.reset(),
    booksDB.reset(),
    listItemsDB.reset(),
  ])
})

test('renders all the book information', async () => {
  const user = buildUser()
  await usersDB.create(user)
  const authUser = await usersDB.authenticate(user)
  // this is what our auth provider does to persist the user's
  // logged in state so it can give us a token without making a request
  // every provider will be different and you'll need to adjust this
  // to whatever they do (you may even have to mock more of their functions).
  window.localStorage.setItem(auth.localStorageKey, authUser.token)

  const book = buildBook()
  booksDB.create(book)
  const route = `/book/${book.id}`
  window.history.pushState({}, 'Test page', route)

  render(<App />, {wrapper: AppProviders})

  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ])

  expect(screen.getByRole('heading', {name: book.title})).toBeInTheDocument()
  expect(screen.getByText(book.author)).toBeInTheDocument()
  expect(screen.getByText(book.publisher)).toBeInTheDocument()
  expect(screen.getByText(book.synopsis)).toBeInTheDocument()
  expect(screen.getByRole('img', {name: /book cover/i})).toHaveAttribute(
    'src',
    book.coverImageUrl,
  )
  expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument()

  expect(
    screen.queryByRole('button', {name: /remove from list/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as read/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as unread/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('textbox', {name: /notes/i}),
  ).not.toBeInTheDocument()
  expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/start date/i)).not.toBeInTheDocument()
})
