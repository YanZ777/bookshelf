import {formatDate} from '../misc'

// test.todo('formatDate formats the date to look nice')
test('formatData formats the date to look nice', () => {
  expect(formatDate(new Date('September 20, 2022'))).toBe('Sep 22')
})
