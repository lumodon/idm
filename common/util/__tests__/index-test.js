import test from 'ava'

import {buildURL, first} from 'src/common/util/index'

test('buildURL properly builds URL w/o query params', t => {
  const baseURL = 'http://www.foo.com'
  const url = buildURL(baseURL)
  t.is(url, baseURL)
})

test('baseURL properly builds URL with query params', t => {
  const baseURL = 'http://www.foo.com'
  const params = {blergh: 'hm', blargh: 'ok'}
  const url = buildURL(baseURL, params)
  t.is(url, `${baseURL}?blergh=hm&blargh=ok`)
})

test('first runs provied asynchronous function for each value, resolving to the first truthy value that is returned', t => {
  const checkedValues = []

  function isThree(n) {
    checkedValues.push(n)
    return Promise.resolve(n === 3 ? n : undefined)
  }

  t.plan(2)

  return first([1, 2, 3, 4, 5], isThree)
    .then(result => {
      t.is(result, 3)
      t.deepEqual(checkedValues, [1, 2, 3])
    })
    .catch(() => t.fail())
})

test('first resolves to undefined if no truthy values are found', t => {
  const checkedValues = []

  function isThree(n) {
    checkedValues.push(n)
    return Promise.resolve(n === 3 ? n : undefined)
  }

  t.plan(2)

  return first([1, 2, 4, 5], isThree)
    .then(result => {
      t.is(result, undefined)
      t.deepEqual(checkedValues, [1, 2, 3, 4, 5])
    })
    .catch(() => {
      t.fail()
    })
})
